import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired, AuthConfig } from 'angular2-jwt';


@Injectable()



export class DatosTokenService {

  public foto_usuario: string;
  public nombre_usuario: string;
  public id_usuario: string;
  public id_tienda: string;
  public logo_tienda: string;
  public nombre_tienda: string;

  headers = new Headers({ 'content-type': 'application/json' });
  options = new RequestOptions({ headers: this.headers, withCredentials: true });

 token: Object = {
    foto_usuario: '',
    nombre_usuario:  '',
    id_usuario:  '',
    id_tienda:  '',
    logo_tienda:  '',
    nombre_tienda:  ''
  };


    constructor(public authService: AuthService,public authHttp: AuthHttp) {
       
    }

    getIdUsuario(){
        return Promise.resolve(this.token); //cuando se resuelvan los datos me vas a sustituir el promise por los datos
    }


    setToken(id_token){
        console.log("Entra a setToken");
        console.log(id_token);
        this.token["foto_usuario"]=id_token.data.Foto_usuario;
        this.token["nombre_usuario"]=id_token.data.Nombre_usuario;
        this.token["id_usuario"]=id_token.data.Id_usuario;
        this.token["id_tienda"]=id_token.data.Id_tienda;
        this.token["logo_tienda"]=id_token.data.Logo_tienda;
        this.token["nombre_tienda"]=id_token.data.Nombre_tienda;
    }

    updateTokenPerfilAdmin(usuario){
        this.token["foto_usuario"]=usuario.Foto_usuario;
        this.token["nombre_usuario"]=usuario.Nombre_usuario;
        console.log(this.token);
    }

    updateTokenServidor(usuario){
        this.token["foto_usuario"]=usuario.Foto_usuario;
        this.token["nombre_usuario"]=usuario.Nombre_usuario;
         console.log(usuario.Email_usuario);
        console.log(usuario.Contra_usuario);
        return this.authHttp.post(environment.dominio + '/usuario/updateToken', 
            JSON.stringify({username:usuario.Email_usuario, password:usuario.Contra_usuario}), this.options)
            .delay(environment.timeout)
            .map((res: Response) => {
                if (res.status === 200) {
                    console.log(res.json());
                    localStorage.setItem("id_token",res.json());
                    return [{ status: res.status}]
                }
                console.log(res);
            }).catch((error: any) => {
                console.log(error);
                if(error.status===401){
                     return  [{ status: error.status, json: "Usuario o contraseña incorrectos"}]
                }
                //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
                return Observable.throw(new Error(error.status));
            });
    }
    




}