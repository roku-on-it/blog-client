import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/component/layout/component/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./component/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'category/:id',
        loadChildren: () =>
          import('./component/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      { path: '', redirectTo: 'users' },
      { path: '**', redirectTo: 'users' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
