import { FacturasComponent } from './facturas.component';
/*import { UsuariosComponent } from './usuarios.component';*/

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: FacturasComponent,
    data: {
      title: 'Facturas'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class FacturasRoutingModule {}
