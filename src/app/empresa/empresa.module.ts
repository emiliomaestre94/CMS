import { EmpresaService } from './../services/empresa.service';
import { EmpresaComponent } from './empresa.component';
import { EmpresaRoutingModule } from './empresa-routing.module';



import { PaginationModule } from 'ng2-bootstrap/pagination';
import { FormsModule } from '@angular/forms';


//VENTA MODAL
import { ModalModule } from "ng2-bootstrap/modal";
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc
import { TabsModule } from 'ng2-bootstrap/tabs';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { provideAuth } from 'angular2-jwt';
import { PopoverModule } from "ng2-bootstrap";


 

@NgModule({
  imports: [
    EmpresaRoutingModule, 
    CommonModule,
    FormsModule,
    ChartsModule,
    DropdownModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule,
  ],
  declarations: [
    EmpresaComponent
  ],
  providers:[
    EmpresaService
  ]
})
export class EmpresaModule { }
