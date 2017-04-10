import { PipesModule } from './../pipes/pipes.module';
import { YoutubeModalComponent, SafePipe } from './youtube-modal.component';
import { ProductosDetalleModalComponent } from './modal-productos.component';
import { ProductosService } from './../services/productos.service';
import { BuscadorProductosPipe } from './buscadorproductos.pipe';
import { ProductosComponent } from './productos.component';
import { ProductosRoutingModule } from './productos-routing.module';

import { PaginationModule } from 'ng2-bootstrap/pagination';
//// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
import { TabsModule } from 'ng2-bootstrap/tabs';
////////////////////
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc
import { DatePickerModule } from 'ng2-datepicker';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { provideAuth } from 'angular2-jwt';


BuscadorProductosPipe
@NgModule({
    imports: [ 
      ProductosRoutingModule,
      PipesModule,
      CommonModule,
      FormsModule,
      ChartsModule,
      DropdownModule,
      DatePickerModule, 
      ModalModule.forRoot(),
      PaginationModule.forRoot(),
       TabsModule
    ],

    declarations: [ 
      ProductosComponent,
      ProductosDetalleModalComponent,
      YoutubeModalComponent,
      BuscadorProductosPipe,
      SafePipe
    ],
    
    providers:[
      ProductosService,
    ]
})
export class ProductosModule { 

}
