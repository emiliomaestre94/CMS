// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';

import { FacturasComponent } from './facturas.component';
import { FacturasService } from './../services/facturas.service';
import { FacturasRoutingModule } from './facturas-routing.module';
import { BuscadorFacturasPipe } from './buscadorfacturas.pipe';


import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { provideAuth } from 'angular2-jwt';


BuscadorFacturasPipe
@NgModule({
    imports: [ 
      FacturasRoutingModule,
      CommonModule,
      FormsModule,
      ChartsModule,
      DropdownModule,
      ModalModule.forRoot()
      
    ],
    declarations: [ 
      FacturasComponent,
      BuscadorFacturasPipe
    ],
    providers:[
      FacturasService,
    ]
})
export class FacturasModule { 

}
