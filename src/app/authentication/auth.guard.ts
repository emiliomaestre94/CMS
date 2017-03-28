import { DatosTokenService } from './../services/datostoken.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { 
    CanActivate, //nos deevuelve un booleano (promesa o observable) y puede comprobar lo que nosotros hagamos en determinado momento
    Router, //para realizar la navegacion(redirect en caso de que no pueda acceder a la ruta)
    ActivatedRouteSnapshot, //Contiene la informacion sobre una ruta en un determinado momento
    RouterStateSnapshot } //representa el estado del router en un momento del tiempo
from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate 
{

    //le pasamos el authservice y el router
    constructor(private authService: AuthService, private router: Router,private tokenservice:DatosTokenService)
    {

    }
 
    accedido: boolean=false;

    //metodo canActivate(lo usamos con el import de canactivate). Next es el estado y state ek estado del router
    canActivate( next: ActivatedRouteSnapshot,state: RouterStateSnapshot)
    {
    console.log("ENTRA AL METODO CAN ACTIVATE");

        return this.authService.getToken().map(x => {
            console.log("TOKEN CORRECTO");
            console.log(x);
            this.tokenservice.setToken(x);
            return true; //CONTINUAMOS
        }).catch((err) => {
            console.log(err);
            console.log("REDIRIGIMOS AL LOGIN");
            this.router.navigate(['/login']);
            return Observable.of(false);
        });
        
    }
} 