import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnexpectedErrorComponent } from './unexpected-error.component';

const routes: Routes = [{ path: '', component: UnexpectedErrorComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnexpectedErrorRoutingModule {}
