import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Apollo, QueryRef } from 'apollo-angular';
import { Query } from 'src/graphql-schema';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { CATEGORY } from 'src/app/component/layout/component/posts/query/category';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  queryRef!: QueryRef<Pick<Query, 'category'>>;
  queryFilter = new FormControl('', [Validators.minLength(3)]);
  readonly debounce = 400;
  private id!: number;

  constructor(
    private readonly apollo: Apollo,
    private readonly activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(({ id }) => {
      this.id = id;
      this.queryRef = this.apollo.watchQuery<Pick<Query, 'category'>>({
        query: CATEGORY,
        variables: {
          id,
        },
      });
    });
  }

  ngOnInit(): void {
    this.queryFilter.valueChanges
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
}
