import { SincronizarComponent } from './sincronizar.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: SincronizarComponent,
    data: {
      title: 'Sincronizar'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SincronizarRoutingModule {}
