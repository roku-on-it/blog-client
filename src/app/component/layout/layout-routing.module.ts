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
          import('./component/posts/posts.module').then((m) => m.PostsModule),
      },
      { path: '', redirectTo: 'home' },
    ],
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
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
