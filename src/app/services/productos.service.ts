import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Headers,Response, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable'; //esta en el directorio node modules
import { Router } from '@angular/router';
import 'rxjs/Rx'; //para el map, catch, thow...etc
import { AuthHttp, tokenNotExpired } from 'angular2-jwt';

export class Producto{
    
    Constructor(
      Id_producto: string,
      Codigo_producto: string,
      Nombre_producto: string,
      Precio_producto: string,
      Imagen_producto: string,
      Descripcion_producto: string,
      Stock_producto: string,
      URL_video_producto: string,
      Estado_producto: string,
      Eliminado_producto: string
    ){ }
}

export class ImageProducto{
    Constructor(
      imageurl: string,
      word: string
    ){ }
}
 
@Injectable()

export class ProductosService {

    headers = new Headers({ 'content-type': 'application/json' });
    options = new RequestOptions({ headers: this.headers, withCredentials: true });

    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {
        
    }

    getProductos(tienda){
        console.log("idtienda es " +tienda);
        let consulta= environment.dominio + '/producto?idtienda=' + tienda;
        return this.authHttp.get(consulta)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json() }]
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

    getImagesAPI(image){
        console.log("Image es  " +image);
        let consulta= "http://api.pixplorer.co.uk/image?word="+image+"&amount=10&size=tb";
        console.log(consulta);
        return this.authHttp.get(consulta)
        .delay(environment.timeout)
        .map((res: Response) => {
            console.log(res);
            return res.json().images;
        }).catch((error: any) => {
            console.log(error);
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });
    }

    producto: Object={  //datos que recibimos del componente padre
        Id_producto:'',
      Codigo_producto:'',
      Nombre_producto:'',
      Precio_producto:'',
      Descripcion_producto:'',
      URL_video_producto:'',  
      Imagen_producto:''
    };
    updateProducto(producto){

        console.log(producto);
        console.log(producto.Id_producto);
        console.log(producto.Descripcion_producto);
        console.log(producto.URL_video_producto);
        console.log(producto.Imagen_producto);
        //console.log(JSON.stringify({usuario:usuario}));
        return this.authHttp.put(environment.dominio + '/producto', 
        {
            id: producto.Id_producto,
            descripcion: producto.Descripcion_producto,
            url_video: producto.URL_video_producto,
            imagen: producto.Imagen_producto
        }, this.options)
        .delay(environment.timeout) 
        .map((res: Response) => {
            console.log(res);
            return res;
        }).catch((error: any) => {
            console.log(error);
            return Observable.throw(new Error(error.status));
        });
    
    }



}