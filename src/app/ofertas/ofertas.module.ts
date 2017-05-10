import { PopoverModule } from 'ng2-bootstrap';
import { PaginationModule } from 'ng2-bootstrap';
import { PipesModule } from './../pipes/pipes.module';

import { ProductosService } from './../services/productos.service';
import { UsuariosService } from './../services/usuarios.service';
import { ModalDetalleOfertasComponent } from './modal-detalle-ofertas.component';
import { ModalOfertasComponent } from './modal-ofertas.component';

import { OfertasRoutingModule } from './ofertas-routing.module';
import { OfertasComponent } from './ofertas.component';
import { BuscadorOfertasPipe } from './buscadorofertas.pipe';
import { OfertasService } from './../services/ofertas.service';

 
//// Modal Component
import { TabsModule } from 'ng2-bootstrap/tabs';
import { ModalModule } from 'ng2-bootstrap/modal';
////////////////////
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc
import { DatePickerModule } from 'ng2-datepicker';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { provideAuth } from 'angular2-jwt';
  

BuscadorOfertasPipe 
@NgModule({
    imports: [ 
      OfertasRoutingModule,
      CommonModule,
      FormsModule,
      ChartsModule,
      DropdownModule,
      DatePickerModule, 
      ModalModule.forRoot(),
      PaginationModule.forRoot(),
      PopoverModule.forRoot(),
      TabsModule,
      PipesModule
    ],

    declarations: [ 
      OfertasComponent,
      ModalOfertasComponent,
      ModalDetalleOfertasComponent,
      BuscadorOfertasPipe
    ],
    
    providers:[
      OfertasService,
      UsuariosService,
      ProductosService
    ],
    exports: [ModalDetalleOfertasComponent]
})
export class OfertasModule { 

} 
