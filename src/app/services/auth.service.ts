import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Usuario } from './usuarios.service';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
//estos ultimos 3 metodos son para que cuando trabajemos con observables tengamos mas funcionalidades

@Injectable()
export class AuthService{

    constructor(private http: Http, private router: Router, public authHttp:AuthHttp) {}
    
    getToken(){     
        let headers = new Headers({ 'content-type': 'application/json' });
        headers.append('X-Requested-With', 'XMLHttpRequest');
        let options = new RequestOptions({ headers: headers, withCredentials: true });
        console.log("GET TOKEN");
        return this.authHttp.post(environment.dominio +'/loginjwt/info', "", options)
            .map( response => { 
               var respJson = response.json(); 
               return respJson;
            });
    }

    login(user){   
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });

        return this.http.post(environment.dominio + '/loginjwt', 
            JSON.stringify({username:user.username, password:user.password}), options)
            .map( response => { 
                var respJson = response.json(); 
                if (response.status==200){ //si la cabecera es 200, es decir, ha creado el token correctamente
                    console.log("Ha creado el token correctamente");
                    localStorage.setItem("id_token",response.json());
                }
                return respJson;
            });
    }

    logout(){
       localStorage.removeItem("id_token");
       this.router.navigate(['/login']); 
    }

    resetpassword(email){
        let headers = new Headers({ 'content-type': 'application/json' });
        let options = new RequestOptions({ headers: headers, withCredentials: true });
/*
        return this.http.post(environment.dominio + '/resetpassword', 
            JSON.stringify({email:email}), options)
            .map( response => { 
                 var respJson = response.json(); 
                 
                if (response.status==204){
                    console.log("El usuario no existe");
                    respJson="El usuario no existe";
                }
                else if(response.status==200){
                    respJson="El usuario no existe";
                }
                 
                
                      //  if(response.status==204){respJson.status==204}        
                return respJson;
            });
       */
        return this.http.post(environment.dominio + '/resetpassword', 
            JSON.stringify({email:email}), options)
            .delay(environment.timeout) //en modo dev establecemos un tiempo de 2 segundos (simulamos tiempo de espera)
            .map((res: Response) => {
                if (res.status === 200) {
                    return [{ status: res.status}]
                }
                else if (res.status === 204) {
                    return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
                }
            }).catch((error: any) => {
                console.log(error);
                //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
                return Observable.throw(new Error(error.status));
            });
    }



/*
//simular un proceso de login en nuestra aplicacion
//return Observable.of(true).delay(2500).do(val => this.isLoggedIn = true);
//isLoggedIn: boolean = false; //booleano que no estará logueado por defecto
//isAdmin: boolean=false;

//LOGIN PARA DISTINGUIR ENTRE ADMINISTRADOR O NO ADMINISTRADOR
login(username: string){
    return Observable.of(true).delay(2500).do( val => { this.isLoggedIn = true;  if(username =="admin"){ this.isAdmin=true;} );
}
*/

}
 