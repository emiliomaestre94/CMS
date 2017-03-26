import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Factura{
    Constructor( Id_factura: string, Id_tienda_factura: string, Fecha_factura: string, 	Total_factura: string, Pagada:string){ }

}
 
@Injectable()

export class FacturasService {

    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {
        
    }
    getFacturasUser(idUsuario,idTienda){
        console.log(idUsuario);
        console.log(idTienda);
        let url=environment.dominio + '/factura';
        return this.authHttp.get(url)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json() }]
            }
            else if (res.status === 206) {
                console.log("status 206");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);

            return Observable.throw(new Error(error.status));
        });
    }
}