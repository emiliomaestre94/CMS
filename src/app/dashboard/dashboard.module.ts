import { EmpresaService } from './../services/empresa.service';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc

import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    DashboardRoutingModule,
    ChartsModule,
    DropdownModule,
    FormsModule,
    CommonModule
  ],
  declarations: [ DashboardComponent ],
  
  providers:[
    EmpresaService
  ]
})
export class DashboardModule { }
 