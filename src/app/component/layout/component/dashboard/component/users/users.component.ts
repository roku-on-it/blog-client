import { Component, OnInit } from '@angular/core';
import { Query, QueryUsersArgs, User } from 'src/graphql-schema';
import { Apollo, QueryRef } from 'apollo-angular';
import { USERS } from 'src/app/component/layout/component/dashboard/component/users/query/users';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  shareReplay,
  switchMap,
} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { PageEvent } from '@angular/material/paginator';

@UntilDestroy()
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  searchString = new FormControl('', [Validators.minLength(3)]);
  queryRef: QueryRef<Pick<Query, 'users'>>;
  dataSource!: Observable<User[]>;
  total!: Observable<number>;
  loading = true;
  displayedColumns: string[] = ['id', 'username', 'fullName', 'role'];
  debounce = 400;

  constructor(private apollo: Apollo, private router: Router) {
    this.queryRef = this.apollo.watchQuery<
      Pick<Query, 'users'>,
      QueryUsersArgs
    >({
      query: USERS,
    });

    this.dataSource = this.queryRef.valueChanges.pipe(
      map((result) => result.data.users.items),
      switchMap(async (data: User[]) => {
        this.loading = false;
        return data;
      }),
      shareReplay(1),
      catchError((err) => {
        if (err?.graphQLErrors[0]?.status === 404) {
          this.router.navigateByUrl('404');
          return throwError(err.message);
        }

        this.router.navigateByUrl('oops', { state: { err } });
        return throwError(err.message);
      })
    );

    this.total = this.queryRef.valueChanges.pipe(
      map((result) => result.data.users.total)
    );
  }

  ngOnInit(): void {
    this.searchString.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap(async (query) =>
          this.queryRef.setVariables({ filter: { query } })
        ),
        untilDestroyed(this)
      )
      .subscribe();
  }

  async onPageChange({ pageIndex, pageSize }: PageEvent): Promise<void> {
    this.loading = true;
    await this.queryRef.setVariables({
      filter: { pageIndex, pageSize },
    });
  }
}
