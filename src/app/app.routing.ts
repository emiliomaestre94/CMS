
import { EditPasswordComponent } from './pages/edit-password.component';
import { ResetPasswordComponent } from './pages/reset-password.component';
import { LoginComponent } from './pages/login.component';
import { AuthGuard } from './authentication/auth.guard';
import { NgModule,ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Layouts
import { FullLayoutComponent } from './layouts/full-layout.component';
import { SimpleLayoutComponent }  from './layouts/simple-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
   // canActivate: [AuthGuard]
  },
  {
    path: '',
    component: FullLayoutComponent,
    data: {
      title: 'Home' 
    },
    children: [
            {
        path: 'empresa',
        loadChildren: './empresa/empresa.module#EmpresaModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'dashboard',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'components',
        loadChildren: './components/components.module#ComponentsModule'
      }, 
      {
        path: 'icons',
        loadChildren: './icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './chartjs/chartjs.module#ChartJSModule'
      },
      {
        path: 'usuarios',
        loadChildren: './usuarios/usuarios.module#UsuariosModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'facturas',
        loadChildren: './facturas/facturas.module#FacturasModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'productos',
        loadChildren: './productos/productos.module#ProductosModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'ofertas',
        loadChildren: './ofertas/ofertas.module#OfertasModule',
        canActivate: [AuthGuard]
      },
      {
        path: 'sincronizar',
        loadChildren: './sincronizar/sincronizar.module#SincronizarModule',
        canActivate: [AuthGuard]
      },
            {
        path: 'perfiladmin',
        loadChildren: './perfiladmin/perfiladmin.module#PerfiladminModule',
        canActivate: [AuthGuard]
      },
    ]
  },
  {
    path: 'pages',
    component: SimpleLayoutComponent,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './pages/pages.module#PagesModule',
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
      data: {
      title: 'Login Page'
    }
  },
  {
    path: 'resetpassword',
    component: ResetPasswordComponent,
      data: {
      title: 'Reset Password'
    }
  },
    {
    path: 'editpassword',
    component: EditPasswordComponent,
      data: {
      title: 'Edit Password'
    }
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
