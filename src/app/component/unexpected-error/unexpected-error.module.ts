import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnexpectedErrorRoutingModule } from './unexpected-error-routing.module';
import { UnexpectedErrorComponent } from './unexpected-error.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [UnexpectedErrorComponent],
  imports: [
    CommonModule,
    UnexpectedErrorRoutingModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
})
export class UnexpectedErrorModule {}
