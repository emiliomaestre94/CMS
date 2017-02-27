import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { p404Component } from './404.component';
import { p500Component } from './500.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';

import { PagesRoutingModule } from './pages-routing.module';
import { CommonModule } from '@angular/common'; //esto es para que funcione el ngif, nfgor etc

@NgModule({
  imports: [ PagesRoutingModule, CommonModule, FormsModule],
  declarations: [
    p404Component,
    p500Component,
    LoginComponent,
    RegisterComponent 
  ]
})
export class PagesModule { }
 