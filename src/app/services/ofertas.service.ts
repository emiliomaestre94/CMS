import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Oferta{
    //Constructor(id: number, name: string){ }
    Constructor(Nombre: string, Municipio: string, Telefono: string, Precio: string,CP:string, Email:string,Fecha:string){ }
}
 
@Injectable()

export class OfertasService {

    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {
        
    }

    comprobacion(){
        console.log("DEBERIA IR");
    }
    
    private usersUrl= environment.dominio + '/usuarios';
     getUsers(): Observable<Oferta[]>{
        return this.authHttp.get(this.usersUrl)
        .map(this.extractData);
    }
    
     private extractData(res: Response) //el elemento que enviamos es de tipo responde
    {
        console.log("Entra");
        let body = res.json(); //los parseamos a json
       console.log(body.Usuarios);
        //return body.data || { }; //devolvemos los datos
        return body.Usuarios || { };
    }


    private handleError(error: any) //te indica el eror
    {
        let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }

}