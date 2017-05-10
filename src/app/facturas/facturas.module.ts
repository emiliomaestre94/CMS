import { PopoverModule } from 'ng2-bootstrap';
import { PipesModule } from './../pipes/pipes.module';
import { HoraPipe } from './../pipes/hora.pipe';
import { FechaPipe } from './../pipes/fecha.pipe';
import { ModalDetalleFacturasComponent } from './modal-detalle-facturas.component';
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
//import { PaginationModule } from 'ng2-bootstrap/pagination';
import { PaginationModule } from 'ng2-bootstrap';

BuscadorFacturasPipe 
@NgModule({
    imports: [ 
      FacturasRoutingModule,
      PipesModule,
      CommonModule,
      FormsModule,
      ChartsModule,
      DropdownModule,
      ModalModule.forRoot(),
      PaginationModule.forRoot(),
      PopoverModule.forRoot(),
    ], 
    declarations: [ 
      FacturasComponent, 
      ModalDetalleFacturasComponent,
      //FechaPipe,
      //HoraPipe
    ],
    providers:[
      FacturasService,
    ],
    exports: [ModalDetalleFacturasComponent]
})
export class FacturasModule { 

}
