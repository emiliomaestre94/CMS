import { TabsModule } from 'ng2-bootstrap/tabs';
import { PerfiladminRoutingModule } from './perfiladmin-routing.module';
import { PerfiladminComponent } from './perfiladmin.component';

//// Modal Component
import { ModalModule } from 'ng2-bootstrap/modal';
////////////////////
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc

import { AUTH_PROVIDERS, JwtHelper } from 'angular2-jwt';
import { provideAuth } from 'angular2-jwt';


@NgModule({
    imports: [
      PerfiladminRoutingModule, 
      CommonModule,
      FormsModule,
      ChartsModule,
      DropdownModule,
      TabsModule,
      ModalModule.forRoot()
    ],

    declarations: [ 
      PerfiladminComponent
    ],
    
    providers:[
    ]
})
export class PerfiladminModule { }
