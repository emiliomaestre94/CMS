import { SincronizarService } from './../services/sincronizar.service';
import { SincronizarRoutingModule } from './sincronizar-routing.module';
import { SincronizarComponent } from './sincronizar.component';


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
    SincronizarRoutingModule,
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
    SincronizarComponent
  ],
  providers:[
    SincronizarService,
  ]
})
export class SincronizarModule { }
