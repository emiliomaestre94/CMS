import { OfertasRoutingModule } from './ofertas-routing.module';
import { OfertasComponent } from './ofertas.component';
import { BuscadorOfertasPipe } from './buscadorofertas.pipe';
import { OfertasService } from './../services/ofertas.service';


//// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
////////////////////
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc

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
      ModalModule.forRoot()
    ],

    declarations: [ 
      OfertasComponent,
      BuscadorOfertasPipe
    ],
    
    providers:[
      OfertasService,
    ]
})
export class OfertasModule { 

}
