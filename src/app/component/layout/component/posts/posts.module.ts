import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from 'src/app/component/layout/component/posts/posts-routing.module';
import { PostsComponent } from 'src/app/component/layout/component/posts/posts.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PostSkeletonComponent } from 'src/app/shared/component/post-skeleton/post-skeleton.component';

@NgModule({
  declarations: [PostsComponent, PostSkeletonComponent],
  imports: [
    CommonModule,
    PostsRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [PostsComponent],
})
export class PostsModule {}
