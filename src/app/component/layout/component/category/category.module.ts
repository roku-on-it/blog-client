import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from 'src/app/component/layout/component/category/category-routing.module';
import { CategoryComponent } from 'src/app/component/layout/component/category/category.component';
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
  declarations: [CategoryComponent, PostSkeletonComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    NgxSkeletonLoaderModule,
    MatIconModule,
    MatListModule,
  ],
  exports: [CategoryComponent, PostSkeletonComponent],
})
export class CategoryModule {}
