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

    
    headers = new Headers({ 'content-type': 'application/json' });
    options = new RequestOptions({ headers: this.headers, withCredentials: true });


    constructor(private http: Http, private router: Router,public authHttp: AuthHttp) {}

    getUsers(pag:number,usuario:string){
         console.log(pag); 
         pag +=-1; //restamos 1 siempre
         pag.toString(); //pasamos a string el number
         console.log(pag);
        return this.authHttp.get(environment.dominio + '/usuario?pagina=' + pag + '&nombre='+usuario)
        .delay(environment.timeout)
        .map((res: Response) => {
            console.log(res);
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json().usuario }]
            }
            else if (res.status === 204) {
                console.log("status 204");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });
    }

    public idTienda:string;
    	
    getUsersOfertaModal(filtro,idTienda){
        console.log(idTienda);
        this.idTienda=idTienda;
        var consulta=this.construirconsulta(filtro);
        return this.authHttp.get(consulta)
        .delay(environment.timeout)
        .map((res: Response) => {
            if (res.status === 200) {;
                console.log("status 200");
                //return res.json().usuario
                return  [{ status: res.status, data: res.json().usuario }]
            }
            else if (res.status === 204) {
                console.log("status 204");
                return  [{ status: res.status, json: "Usuario no encontrado en la base de datos" }]
            }
        }).catch((error: any) => {
            console.log(error);
            //return [{ status: error.status, json: "Error en la conexión con el servidor" }]
            return Observable.throw(new Error(error.status));
        });
    }
    
    construirconsulta(filtro){
        console.log(filtro)
        let consulta=environment.dominio + "/usuario/tienda?id_tienda="+this.idTienda;
        if (filtro["nombre"]!='')  consulta+="&nombre="+filtro["nombre"];
        if (filtro["sexo"]!='')  consulta+="&sexo="+filtro["sexo"];
        if (filtro["cp"]!='')  consulta+="&cp="+filtro["cp"];
        if (filtro["fecha_min"]!='')  consulta+="&fechanac_min="+filtro["fecha_min"];
        if (filtro["fecha_max"]!='')  consulta+="&fechanac_max="+filtro["fecha_max"];
        
        /*
        let i=0;

        if (filtro["nombre"]!=''){
            consulta+="?nombre="+filtro["nombre"];
            i++;
        }
        if (filtro["sexo"]!=''){
            (i>=1) ? consulta+="&sexo="+filtro["sexo"] :  consulta+="?sexo="+filtro["sexo"];
            i++;
        }
        if (filtro["cp"]!=''){
            (i>=1) ? consulta+="&cp="+filtro["cp"] :  consulta+="?cp="+filtro["cp"];
            i++;
        }
        if (filtro["edad_min"]!=''){
            (i>=1) ? consulta+="&fechanac_min="+filtro["edad_min"] :  consulta+="?fechanac_min="+filtro["edad_min"];
            i++;
        }
        if (filtro["edad_max"]!=''){
            (i>=1) ? consulta+="&fechanac_max="+filtro["edad_max"] :  consulta+="?fechanac_max="+filtro["edad_max"];
            i++;
        }
        */
        console.log(consulta);
        return consulta;
    }

    updateStateActivo(usuario: Object){
       //console.log(JSON.stringify({usuario:usuario}));
        return this.authHttp.put(environment.dominio + '/usuario/updateState', 
        {
         usuario:usuario
        }, this.options)
        .delay(environment.timeout) 
        .map((res: Response) => {
            //console.log(res);
            return res;
        }).catch((error: any) => {
            console.log(error);
            return Observable.throw(new Error(error.status));
        });
    }

} 