import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Usuario{
    //Constructor(id: number, name: string){ }
    Constructor(Nombre_usuario: string, Localicadad_usuario: string, Telefono_usuario: string,CP_usuario:string, Email_usuario:string,Fecha_usuario:string){ }
} 
 
@Injectable()

export class UsuariosService {

    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {
        
    }

    comprobacion(){
        console.log("DEBERIA IR");
    }
    private usersUrl= environment.dominio + '/usuario';
     getUsers(): Observable<Usuario[]>{
        return this.authHttp.get(this.usersUrl)
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

}