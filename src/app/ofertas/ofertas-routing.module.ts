import { OfertasComponent } from './ofertas.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: OfertasComponent,
    data: {
      title: 'Ofertas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class OfertasRoutingModule {}
