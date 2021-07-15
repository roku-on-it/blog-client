import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from 'src/app/component/layout/layout-routing.module';
import { LayoutComponent } from 'src/app/component/layout/layout.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryModule } from 'src/app/component/layout/component/category/category.module';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatTreeModule,
    MatInputModule,
    ReactiveFormsModule,
    CategoryModule,
    MatProgressBarModule,
  ],
})
export class LayoutModule {}
