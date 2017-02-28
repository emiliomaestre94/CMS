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
        loadChildren: './usuarios/usuarios.module#UsuariosModule'
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
