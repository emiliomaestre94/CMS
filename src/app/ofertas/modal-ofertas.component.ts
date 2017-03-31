import {Producto, ProductosService } from './../services/productos.service';
import { DatosTokenService } from './../services/datostoken.service';
import { Usuario,UsuariosService } from './../services/usuarios.service';
import { Component, ViewChild,ViewChildren} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import * as moment from 'moment';

@Component({
  selector: 'modal-oferta',
  templateUrl: './modal-ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class ModalOfertasComponent {
  
  @ViewChild('ModalOfertas') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide
  @ViewChildren('checkboxUser') checkboxUsers; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI

  public usuarios:Usuario[];//objeto que guardara el objeto de usuarios;
  public productos:Producto[];//objeto que guardara el objeto de usuarios;

  public filtro: Object={
    nombre:'',
    sexo:'',
    cp:'',
    edad_min:'',
    edad_max:'',
  }

  public edad_min = []; //creamos un array de edades
  public edad_max = [];
  public IdUsuarios=[]; //array que contiene el id de los usuarios que checkeamos
  public idTienda: string; //id de la tienda que cogemos de datostokenservice
  public edadminima:string=''; //guarda la edad minima del form
  public edadmaxima:string=''; //edad maxima del form
  
  constructor(public usuariosService:UsuariosService,public datostokenservice: DatosTokenService, public productosService: ProductosService) {
    this.idTienda=this.datostokenservice.token["id_tienda"];
    for (let i = 16; i < 100; i++) { //para rellenar los arrays de checkbox de edades
      let newName = {
        id:i.toString(),
      };
      this.edad_min.push(newName);
      this.edad_max.push(newName);
    }
   }

  public showChildModal():void {
    this.childModal.show(); //mostrar modal
    this.getProductos();
  }

  public getProductos(){
    this.productosService.getProductos(this.idTienda).subscribe(
      res =>{
        console.log(res);  
        if(res[0]){
          if (res[0].status==200){ //todo bien
            this.productos=res[0].data.Productos
            console.log(this.productos);
          }
          if (res[0].status==206){ //no encontrado
              console.log("No hay usuarios");
          }
        }
        
      },
      err=>{  
          console.log(err);
      },   
    );
  }



  
   selectUser(event,idUsu){
     console.log("entra");
     if(event.target.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdUsuarios.push(idUsu);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdUsuarios.indexOf(idUsu, 0);
        if (index > -1) {
          this.IdUsuarios.splice(index, 1);
        }
     }
     console.log(this.IdUsuarios);
   }

   selectUserBucle(event,idUsu){
      //console.log("entra2");
     if(event.nativeElement.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdUsuarios.push(idUsu);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdUsuarios.indexOf(idUsu, 0);
        if (index > -1) {
          this.IdUsuarios.splice(index, 1);
        }
     }
    // console.log(this.IdUsuarios);
   }

    selectAllUsers(event){
      this.IdUsuarios = [];
      for(let checkboxusers of this.checkboxUsers._results){

        if(event.target.checked==true){
         checkboxusers.nativeElement.checked=true;
         let idUsu= +checkboxusers.nativeElement.value
         this.selectUserBucle(checkboxusers,idUsu);
        
        }
        else{
          checkboxusers.nativeElement.checked=false;
          this.IdUsuarios=[];
        }
      //console.log(checkboxusers);
    }
    console.log(this.IdUsuarios);
   }

  
  
  
  
  
  
  



  public buildDates(edad){
    var today= moment().format('L');
    var res = today.split("/");
    var anyo= +res[2] -edad; //el + para pasar a number
    anyo.toString();
    var final:string=anyo+"-"+res[0]+"-"+res[1];
    console.log(final);
    return final;
  }
  
  //Boton buscar del formulario
  public onLogin(){
    (this.edadminima!='') ? this.filtro["fecha_max"]=this.buildDates(this.edadminima) :this.filtro["fecha_max"]='' ;
    (this.edadmaxima!='') ? this.filtro["fecha_min"]=this.buildDates(this.edadmaxima) :this.filtro["fecha_min"]='' ;

    this.usuariosService.getUsersOfertaModal(this.filtro,this.idTienda).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.usuarios=res[0].data;
                //console.log("usuarios es");
                //console.log(this.usuarios);
 
                
              }
              if (res[0].status==206){ //no encontrado
                console.log(res[0].status);

              }
            }    
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);   
          },   
    );
  }

  public hideChildModal():void {
    this.childModal.hide();
    this.usuarios=null;
  }

}
