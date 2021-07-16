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

interface NavItem {
  label: string;
  path: string;
  icon?: string;
}

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  searchString = new FormControl('', [Validators.minLength(3)]);
  loading!: boolean;
  readonly result: Observable<Category[]>;
  readonly staticRoutes: NavItem[] = [
    {
      label: 'Home',
      path: 'home',
      icon: 'home',
    },
  ];
  private queryRef!: QueryRef<Pick<Query, 'categories'>, QueryCategoriesArgs>;
  private readonly debounce = 400;

  constructor(private apollo: Apollo, private router: Router) {
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
    // Not killing the subscription here because layout component is always mounted
    this.searchString.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap((query: string) => {
          this.loading = true;
          return this.queryRef.setVariables({
            filter: { query },
          });
        }),
        switchMap(({ data }: any) => {
          this.loading = false;
          return data.categories;
        })
      )
      .subscribe(($data) => $data);
  }
}
