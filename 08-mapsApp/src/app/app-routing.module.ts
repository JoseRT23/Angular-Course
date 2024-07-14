import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'maps', 
    loadChildren: () => import('./maps/maps.module').then(m => m.MapsModule),
  },
  {
    path: 'alone', //import standalone componente with lazy loading
    loadComponent: () => import('./alone/pages/alone/alone.component').then(m => m.AloneComponent),
  },
  {
    path: '**',
    redirectTo: 'maps',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
