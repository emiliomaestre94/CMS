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

    TotalPrecio

    headers = new Headers({ 'content-type': 'application/json' });
    options = new RequestOptions({ headers: this.headers, withCredentials: true });

    getFacturas(pag:number,usuario:string,idTienda:string){
         console.log(pag); 
         pag +=-1; //restamos 1 siempre
         pag.toString(); //pasamos a string el number
         console.log(pag);
        return this.authHttp.get(environment.dominio + '/factura?id_tienda='+idTienda)
        .delay(environment.timeout)
        .map((res: Response) => {
            console.log(res);
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json() }]
            }
            else if (res.status === 204) {
                console.log("status 204");
                return  [{ status: res.status, json: "Factura no encontrada en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });
    }

    getFactura(id){
        let consulta= environment.dominio + '/factura?id=' + id;
        console.log(consulta);
        return this.authHttp.get(consulta)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json() }]
            }
            else if (res.status === 204) {
                console.log("status 204");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });
    }



    getFacturasUser(idUsuario,idTienda){
        console.log(idUsuario);
        console.log(idTienda);
        let url=environment.dominio + '/factura/usuario?id='+idUsuario+'&id_tienda='+idTienda;
        console.log(url);
        return this.authHttp.get(url)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json() }]
            }
            else if (res.status === 204) {
                console.log("status 204");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);

            return Observable.throw(new Error(error.status));
        });
    }
}