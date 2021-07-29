import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from 'src/app/component/layout/component/post/post-routing.module';
import { PostComponent } from 'src/app/component/layout/component/post/post.component';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    MatCardModule,
    MatListModule,
    MatExpansionModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class PostModule {}
