import { PerfiladminComponent } from './perfiladmin.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    component: PerfiladminComponent,
    data: {
      title: 'Perfiladmin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PerfiladminRoutingModule {}
