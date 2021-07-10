import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Category, Query, QueryCategoriesArgs } from 'src/graphql-schema';
import { CATEGORIES } from 'src/app/component/layout/query/categories';
import { FormControl, Validators } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { Observable } from 'rxjs';

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
  queryRef!: QueryRef<Pick<Query, 'categories'>, QueryCategoriesArgs>;
  queryFilter = new FormControl('', [Validators.minLength(3)]);
  readonly result: Observable<Category[]>;
  readonly staticRoutes: NavItem[] = [
    {
      label: 'Home',
      path: 'home',
      icon: 'home',
    },
  ];
  private readonly debounce = 400;

  constructor(private readonly apollo: Apollo) {
    this.queryRef = apollo.watchQuery<
      Pick<Query, 'categories'>,
      QueryCategoriesArgs
    >({
      query: CATEGORIES,
    });

    this.result = this.queryRef.valueChanges.pipe(
      map((result) => result.data?.categories)
    );
  }

  ngOnInit(): void {
    // Not killing the subscription here because layout component is always mounted
    this.queryFilter.valueChanges
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        switchMap(async (query) =>
          this.queryRef.setVariables({
            filter: { query },
          })
        )
      )
      .subscribe(($data) => $data);
  }
}
