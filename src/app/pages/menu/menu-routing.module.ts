import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: 'menu',
    component: MenuPage,
    children: [
      { path: 'home', loadChildren: '../home/home.module#HomePageModule' },
      { path: 'home/:index', loadChildren: '../details/details.module#DetailsPageModule' },
      { path: 'about', loadChildren: () => import('../about/about.module').then(m => m.AboutPageModule) },
    ]
  },
  {
    path: '',
    redirectTo: '/menu/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
