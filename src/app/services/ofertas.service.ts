import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Oferta{
    //Constructor(id: number, name: string){ }
    Constructor(Id_oferta_usuario: string, Fecha_inicio_oferta_usuario	: string, Fecha_fin_oferta_usuario: string, P_oferta_oferta_usuario: string,Id_tienda_oferta_usuario:string, Id_producto_tienda_oferta_usuario:string,
    Foto_oferta_usuario:string, Descripcion_oferta_usuario:string, Estado_oferta_usuario:string,Eliminado_oferta_usuario:string){ }
}
 
@Injectable()

export class OfertasService {

    headers = new Headers({ 'content-type': 'application/json' });
    options = new RequestOptions({ headers: this.headers, withCredentials: true });

    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {
        
    }
 
        getOfertas(pag:number,oferta:string,idTienda:string){
         console.log(pag); 
         pag +=-1; //restamos 1 siempre
         pag.toString(); //pasamos a string el number
         console.log(pag);
        return this.authHttp.get(environment.dominio + '/oferta/ofertasUsuario?id_tienda='+idTienda)
        .delay(environment.timeout)
        .map((res: Response) => {
            console.log(res);
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json().Ofertas }]
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

    public uploadOferta(usuarios,idProducto,oferta,idTienda){ 
        return this.authHttp.post(environment.dominio + '/oferta/ofertasUsuario', 
        JSON.stringify({
           usuarios: usuarios,
           p_oferta: oferta.Precio,
           fechaini: oferta.Fecha_final.formatted,
           fechafin: oferta.Fecha_inicio.formatted,
           id_tienda: idTienda,
           id_producto_tienda: idProducto,
           foto: oferta.Imagen,
           Descripcion: oferta.Descripcion,
           estado: oferta.Estado,
           eliminado: oferta.Eliminado
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