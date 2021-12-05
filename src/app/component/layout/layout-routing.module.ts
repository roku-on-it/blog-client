import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'src/app/component/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./component/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'categories/:id',
        loadChildren: () =>
          import(
            'src/app/component/layout/component/category/category.module'
          ).then((m) => m.CategoryModule),
      },
      {
        path: 'posts/:id',
        loadChildren: () =>
          import('./component/post/post.module').then((m) => m.PostModule),
      },
      { path: '', redirectTo: 'home' },
    ],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./component/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '404',
    loadChildren: () =>
      import('../not-found/not-found.module').then((m) => m.NotFoundModule),
  },
  {
    path: 'oops',
    loadChildren: () =>
      import('../unexpected-error/unexpected-error.module').then(
        (m) => m.UnexpectedErrorModule
      ),
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
