import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Category, Post, Query } from 'src/graphql-schema';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  pluck,
  switchMap,
} from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { CATEGORY } from 'src/app/component/layout/component/posts/query/category';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, throwError } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { Title } from '@angular/platform-browser';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  searchString = new FormControl('', [Validators.minLength(3)]);
  result!: Observable<Post[] | undefined>;
  category!: Observable<Category>;
  loading = true;
  private queryRef!: QueryRef<Pick<Query, 'category'>>;
  private readonly debounce = 400;
  private id?: number;

  constructor(
    private readonly apollo: Apollo,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly title: Title
  ) {
    activatedRoute.params.subscribe(({ id }) => {
      id = id.slice(id.lastIndexOf('-') + 1);
      this.id = id;
      this.queryRef = this.apollo.watchQuery<Pick<Query, 'category'>>({
        query: CATEGORY,
        variables: {
          id,
        },
      });

      this.result = this.queryRef.valueChanges.pipe(
        map((result) => result.data.category.posts),
        pluck('items'),
        switchMap(async (data: any) => {
          this.loading = false;
          return data;
        }),
        catchError((err) => {
          if (err.graphQLErrors[0].status === 404) {
            this.router.navigateByUrl('404');

            return throwError(err.message);
          }

          this.router.navigateByUrl('oops');

          return throwError(err);
        })
      );

      this.category = this.queryRef.valueChanges
        .pipe(
          map((result) => result.data.category),
          switchMap(async (data: Category) => {
            this.title.setTitle(data.name + ' | ' + "Oğuz Türkay's blog");
            return data;
          })
        )
        .pipe(untilDestroyed(this));
    });
  }

  ngOnInit(): void {
    this.searchString.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap(async (query) =>
          this.queryRef.setVariables({ id: this.id, filter: { query } })
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  async onPageChange({ pageIndex, pageSize }: PageEvent): Promise<void> {
    this.loading = true;
    await this.queryRef.setVariables({
      id: this.id,
      filter: { pageIndex, pageSize },
    });
  }
}
