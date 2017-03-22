import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Usuario{
    //Constructor(id: number, name: string){ }
    Constructor(Nombre_usuario: string, Email_usuario:string, CP_usuario:string, Localicadad_usuario: string, Telefono_usuario: string, Sexo_usuario: string,Foto_usuario: string){ }
} 
 
@Injectable()

export class UsuariosService {

    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {}

    getUsers(pag:number,usuario:string){
         console.log(pag);
         pag +=-1; //restamos 1 siempre
         pag.toString(); //pasamos a string el number
         console.log(pag);
        return this.authHttp.get(environment.dominio + '/usuario?pagina=' + pag + '&nombre='+usuario)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json().usuario }]
            }
            else if (res.status === 206) {
                console.log("status 206");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });
    }


//environment.dominio + '/usuario?pag=' + pag

/*
     getUsers(pag:number,usuario:string): Observable<Usuario[]>{
         console.log(pag);
         pag +=-1; //restamos 1 siempre
         pag.toString(); //pasamos a string el number
         console.log(pag);
        return this.authHttp.get(environment.dominio + '/usuario?pagina=' + pag + '&nombre='+usuario)
        .map(this.extractData);
    }
    
     private extractData(res: Response) //el elemento que enviamos es de tipo responde
    {
        console.log("Entra");
        let body = res.json(); //los parseamos a json
       console.log(body.usuario);
        //return body.data || { }; //devolvemos los datos
        return body.usuario || { };
    }


    private handleError(error: any) //te indica el eror
    {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
    */
    

}