import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnexpectedErrorRoutingModule } from './unexpected-error-routing.module';
import { UnexpectedErrorComponent } from './unexpected-error.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [UnexpectedErrorComponent],
  imports: [CommonModule, UnexpectedErrorRoutingModule, MatButtonModule],
})
export class UnexpectedErrorModule {}
