import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Sincronizar{
    Constructor( Id_factura: string, Id_tienda_factura: string, Fecha_factura: string, 	Total_factura: string, Pagada:string){ }

}
 
@Injectable()

export class EmpresaService {

    headers = new Headers({ 'content-type': 'application/json' });
    options = new RequestOptions({ headers: this.headers, withCredentials: true });

    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {}

    getTienda(idTienda){
        let url=environment.dominio + '/tienda?id='+idTienda;
        console.log(url);
        return this.authHttp.get(url)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                console.log("status 200");
                return  [{ status: res.status, data: res.json() }]
            }
            else if (res.status === 204) {
                console.log("status 204");
                return  [{ status: res.status, json: "TIenda no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);
            return Observable.throw(new Error(error.status));
        });
    }

    updateTienda(tienda,url){
        console.log(tienda);
       return this.authHttp.put(environment.dominio + '/tienda', 
        JSON.stringify({
           id_tienda: tienda.Id_tienda,
           nombre: tienda.Nombre_tienda,
           direccion:tienda.Direccion_tienda,
           provincia:tienda.Provincia_tienda,
           cp:tienda.CP_tienda,
           cif:tienda.CIF_tienda,
           horario:tienda.Horario_tienda,
           descripcion:tienda.Descripcion_tienda,
           foto:tienda.Foto_tienda,
           logo:tienda.Logo_tienda,
           facebook: tienda.Facebook_tienda,
           twitter: tienda.Facebook_tienda
        }), this.options)
        .delay(environment.timeout)
        .map((res: Response) => {
        return  [{ status: res.status}]
        }).catch((error: any) => {
            console.log(error)
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });      
    }

}