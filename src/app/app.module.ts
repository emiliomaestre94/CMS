
import { EditPasswordComponent } from './pages/edit-password.component';
import { ResetPasswordComponent } from './pages/reset-password.component';
import { LoginComponent } from './pages/login.component';
import { AuthGuard } from './authentication/auth.guard';
import { AuthService } from './services/auth.service';
import { UsuariosService } from './services/usuarios.service';
import { FacturasService } from './services/facturas.service';
import { ProductosService } from './services/productos.service';
import { OfertasService } from './services/ofertas.service';
import { PerfiladminService } from './services/perfiladmin.service';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

import { DatePickerModule } from 'ng2-datepicker';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { SIDEBAR_TOGGLE_DIRECTIVES } from './shared/sidebar.directive';
import { AsideToggleDirective } from './shared/aside.directive';
import { BreadcrumbsComponent } from './shared/breadcrumb.component';


// Routing Module
import { AppRoutingModule } from './app.routing';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent } from './layouts/simple-layout.component';

import { AUTH_PROVIDERS, AuthHttp, AuthConfig} from 'angular2-jwt';
import { provideAuth } from 'angular2-jwt';

import { HttpModule,Http, RequestOptions } from '@angular/http';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'id_token',
        tokenGetter: (() => localStorage.getItem('id_token')),
        globalHeaders: [{'Content-Type':'application/json'}],
     }), http, options);
}

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpModule,
    FormsModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(), 
    ChartsModule,
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
    ResetPasswordComponent,
    LoginComponent,
    EditPasswordComponent,
    NAV_DROPDOWN_DIRECTIVES,
    BreadcrumbsComponent,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
  ],
  providers: [/*{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  //UsuariosService
*/     

    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },
  AuthService,
  AuthGuard
  ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
