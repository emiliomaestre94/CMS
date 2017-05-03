import { PopoverModule } from 'ng2-bootstrap';
import { PipesModule } from './../pipes/pipes.module';
import { UsuariosModalFacturaComponent } from './usuarios-modalfactura.component';
import { UsuariosModalPerfilComponent } from './usuarios-modalperfil.component';

import { PaginationModule } from 'ng2-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
//import { BuscadorUsuariosPipe } from './buscadorusuarios.pipe';
import { UsuariosService } from './../services/usuarios.service';
import { UsuariosComponent } from './usuarios.component';
import { UsuariosRoutingModule } from './usuarios-routing.module';

//VENTA MODAL
import { ModalModule } from "ng2-bootstrap/modal";


import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc
import { TabsModule } from 'ng2-bootstrap/tabs';

import { AUTH_PROVIDERS } from 'angular2-jwt';
import { provideAuth } from 'angular2-jwt';


 

@NgModule({
  imports: [ 
    UsuariosRoutingModule,
    PipesModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    DropdownModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    TabsModule
  ],
  declarations: [ 
    UsuariosComponent,
    UsuariosModalPerfilComponent,
    UsuariosModalFacturaComponent,
    //BuscadorUsuariosPipe
  ],
  providers:[
    UsuariosService, //con declararlo aqui es suficiente

  ],

})
export class UsuariosModule { }
