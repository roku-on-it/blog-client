import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, throwError } from 'rxjs';
import { Direction, Post, Query, QueryPostsArgs } from 'src/graphql-schema';
import { Apollo, QueryRef } from 'apollo-angular';
import { POSTS } from 'src/app/component/layout/component/home/query/posts';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { untilDestroyed } from '@ngneat/until-destroy';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  result!: Observable<Post[] | undefined>;
  loading = true;
  total!: Observable<number>;
  filterForm = new FormGroup({
    searchString: new FormControl('', [Validators.minLength(3)]),
    field: new FormControl('createdAt', [Validators.required]),
    direction: new FormControl('DESC', [Validators.required]),
  });
  private queryRef!: QueryRef<Pick<Query, 'posts'>>;
  private readonly debounce = 400;

  constructor(private apollo: Apollo, private router: Router) {
    this.queryRef = this.apollo.watchQuery<
      Pick<Query, 'posts'>,
      QueryPostsArgs
    >({
      query: POSTS,
      variables: {
        filter: {
          orderBy: {
            field: 'updatedAt',
            direction: Direction.Desc,
          },
          pageSize: 10,
        },
      },
    });

    this.total = this.queryRef.valueChanges.pipe(
      map((result) => result.data.posts.total)
    );

    this.result = this.queryRef.valueChanges.pipe(
      map((result) => result.data.posts.items),
      tap(() => (this.loading = false)),
      catchError((err) => {
        this.router.navigateByUrl('oops', { state: { err } });
        return throwError(err.message);
      })
    );
  }

  ngOnInit(): void {
    this.filterForm.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap(async ({ searchString, field, direction }) =>
          this.queryRef.setVariables({
            filter: {
              query: searchString,
              pageSize: 10,
              orderBy: {
                field,
                direction,
              },
            },
          } as QueryPostsArgs)
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  async onPageChange({ pageIndex, pageSize }: PageEvent): Promise<void> {
    this.loading = true;
    await this.queryRef.setVariables({
      filter: {
        pageIndex,
        pageSize,
        query: this.filterForm.get('searchString')?.value,
        orderBy: {
          field: this.filterForm.get('field')?.value,
          direction: this.filterForm.get('direction')?.value,
        },
      },
    } as QueryPostsArgs);
  }
}
