import { Component, OnInit } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Post, Query } from 'src/graphql-schema';
import { ActivatedRoute, Router } from '@angular/router';
import { POST } from 'src/app/component/layout/component/post/query/post';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, throwError } from 'rxjs';
import { catchError, map, shareReplay, tap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

@UntilDestroy()
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  queryRef!: QueryRef<Pick<Query, 'post'>>;
  post!: Observable<Post>;

  constructor(
    private apollo: Apollo,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private title: Title
  ) {
    this.activatedRoute.params
      .pipe(untilDestroyed(this))
      .subscribe(({ id }) => {
        id = id.slice(id.lastIndexOf('-') + 1);
        this.queryRef = apollo.watchQuery<Pick<Query, 'post'>>({
          query: POST,
          variables: {
            id,
          },
        });

        this.post = this.queryRef.valueChanges.pipe(
          map((result) => result.data.post),
          tap((data) =>
            this.title.setTitle(data.title + ' | ' + "Oğuz Türkay's blog")
          ),
          tap(() => console.log('created observable')),
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
      });
  }

  ngOnInit(): void {}
}
