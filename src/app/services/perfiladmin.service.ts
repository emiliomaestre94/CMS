import { DatosTokenService } from './datostoken.service';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired, AuthConfig } from 'angular2-jwt';

export class Perfiladmin{
    //Constructor(id: number, name: string){ }
    Constructor(Nombre_usuario: string, Email_usuario:string, CP_usuario:string, Localicadad_usuario: string, Telefono_usuario: string, Sexo_usuario: string){ }
} 
 
@Injectable()

export class PerfiladminService {

    headers = new Headers({ 'content-type': 'application/json' });
    options = new RequestOptions({ headers: this.headers, withCredentials: true });

    constructor(
        private http: Http, 
        private router: Router,
        public authHttp: AuthHttp,
        public authService: AuthService,
        public datostokenservice: DatosTokenService
        ) {}

     getUser(id){
        //console.log("GETUSER");
        return this.authHttp.get(environment.dominio + '/usuario?id='+id)
        .delay(environment.timeout)
        .map((res: Response) => {
            //console.log(res);
            //console.log(res.json().usuario);
            if (res.status === 200) {;
                //console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json().usuario }]
            }
            else if (res.status === 206) {
                //console.log("status 206");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            //console.log(error);
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });
    
    }



    updateUser(usuario,sexo,image){ 
        return this.authHttp.put(environment.dominio + '/usuario', 
        JSON.stringify({
            id: usuario.Id_usuario,
            nombre: usuario.Nombre_usuario,
            email: usuario.Email_usuario,
            sexo: sexo,
            foto: image
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

    checkPassword(password,id){
        return this.authHttp.post(environment.dominio + '/usuario/checkPassword', 
        JSON.stringify({
           id: id,
           password:password
        }), this.options)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                //console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json() }]
            }
            else if (res.status === 206) {
                //console.log("status 206");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error)
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        }); 
    }

    updatePassword(password,id){
        return this.authHttp.put(environment.dominio + '/usuario', 
        JSON.stringify({
            contra:password,
            id:id
        }), this.options)
        .delay(environment.timeout) 
        .map((res: Response) => {
            console.log(res);
            if (res.status === 200) {
                console.log(res.status);
                return [{ status: res.status,data: res.json() }]
            }
        }).catch((error: any) => {
            console.log(error);
            if(error.status==401){
                return  [{ status: error.status, json: "Usuario no encontrado en la base de datos" }]
            }
            return Observable.throw(new Error(error.status));
        });
    }
}