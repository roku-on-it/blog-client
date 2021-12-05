import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Category, Query, QueryCategoriesArgs } from 'src/graphql-schema';
import { CATEGORIES } from 'src/app/component/layout/query/categories';
import { FormControl, Validators } from '@angular/forms';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

@UntilDestroy()
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  searchString = new FormControl('', [Validators.minLength(3)]);
  loading!: boolean;
  readonly result: Observable<Category[]>;
  readonly staticRoutes: NavItem[] = [
    {
      label: 'Users',
      path: 'users',
      icon: 'people',
    },
  ];
  private queryRef!: QueryRef<Pick<Query, 'categories'>, QueryCategoriesArgs>;
  private readonly debounce = 400;

  constructor(
    private apollo: Apollo,
    private router: Router,
    public title: Title
  ) {
    this.queryRef = apollo.watchQuery<
      Pick<Query, 'categories'>,
      QueryCategoriesArgs
    >({
      query: CATEGORIES,
    });

    this.result = this.queryRef.valueChanges.pipe(
      map((result) => result.data?.categories),
      tap(() => (this.loading = false)),
      catchError((err) => {
        this.router.navigateByUrl('oops', { state: { err } });
        return throwError(err.message);
      })
    );
  }

  ngOnInit(): void {
    this.searchString.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap((query: string) => {
          if (this.searchString.valid) {
            this.loading = true;
            return this.queryRef.setVariables({
              filter: { query },
            });
          }

          return this.queryRef.setVariables({});
        }),
        switchMap(({ data }: any) => {
          this.loading = false;
          return data.categories;
        }),
        untilDestroyed(this)
      )
      .subscribe(($data) => $data);
  }
}
