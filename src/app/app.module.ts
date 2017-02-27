
import { FacturasService } from './services/facturas.service';

import { LoginService } from './services/login.service';
import { UsuariosService } from './services/usuarios.service';

import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LocationStrategy, HashLocationStrategy,PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { TabsModule } from 'ng2-bootstrap/tabs';
import { NAV_DROPDOWN_DIRECTIVES } from './shared/nav-dropdown.directive';

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
    HttpModule,
    FormsModule,
    AppRoutingModule,
    DropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule
  ],
  declarations: [
    AppComponent,
    FullLayoutComponent,
    SimpleLayoutComponent,
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
LoginService,
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    {
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  },

  ],
  bootstrap: [ AppComponent]
})
export class AppModule { }
