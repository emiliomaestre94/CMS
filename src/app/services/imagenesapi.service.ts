import { Observable } from 'rxjs/Observable';
import {Http , Response}from '@angular/http'; 
import { Injectable } from '@angular/core';

const BASE_URL = 'https://pixabay.com/api/';
const API_TOKEN = '5349399-cb3502d494cfe7c25ab186488';

@Injectable()
export class ImagenesAPIService{
  constructor(private http:Http){}
  
  search(query){
    var consulta=`${BASE_URL}?key=${API_TOKEN}&q=${query}&image_type=photo`;
    console.log(consulta);
    return this.http.get(consulta)
        .map((res: Response) => {
            console.log(res);
            return  [{ status: res.status, data: res.json()}]
        }).catch((error: any) => {
            console.log(error);
            return Observable.throw(new Error(error.status));
        });
    }
}

   

