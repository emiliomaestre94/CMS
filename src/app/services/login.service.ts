import { environment } from './../../environments/environment';
import { Usuario } from './usuarios.service';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

@Injectable()

export class LoginService {

    constructor(private http: Http, private router: Router, public authHttp:AuthHttp) {
        
    }

    comprobacion(){
        console.log("DEBERIA IR");
    }


    login(user) {
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        var hola=  JSON.stringify({name:user.name,password:user.password});
        console.log(user.name);
        console.log(user.password);
        console.log(hola);
        return this.http.post(environment.dominio + '/loginjwt', 
            JSON.stringify({username:user.name,password:user.password}), options)
            .map( response => { 

                var respJson = response.json(); 
                if (response.status==200){ //si la cabecera es 200, es decir, ha creado el token correctamente
                    console.log("Ha creado el token correctamente");
                    localStorage.setItem("id_token",response.json());
                }
                return respJson;
            });
    }   

    getToken(){
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('X-Requested-With', 'XMLHttpRequest');
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.authHttp.post(environment.dominio +'/loginjwt/info', "", options)
            .map( response => { 
               var respJson = response.json(); 
               return respJson;
            });
    }
}