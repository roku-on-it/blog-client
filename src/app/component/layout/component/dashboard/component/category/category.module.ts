import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from 'src/app/component/layout/component/dashboard/component/category/category-routing.module';
import { CategoryComponent } from 'src/app/component/layout/component/dashboard/component/category/category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [CommonModule, CategoryRoutingModule],
})
export class CategoryModule {}
