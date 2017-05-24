import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Sincronizar{
    //Constructor(id: number, name: string){ }
    Constructor(
        fecha: string, 
        /*hora:string, 
        productos:string, 
        clientes: string, 
        nuevos: string, 
        modificados: string,
        eliminados: string,*/
    ){ }
} 

export interface sinc {
  fecha: string;
    hora:string, 
productos:string, 
clientes: string, 
nuevos: string, 
modificados: string,
eliminados: string,
}
@Injectable()

export class SincronizarService {
public sincronizaciones: sinc[] = [];

    constructor(
        private http: Http, 
        private router: Router,
        public authHttp: AuthHttp)
    { }



}