import { UsuariosModalPerfilComponent } from './usuarios-modalperfil.component';
import { DatosTokenService } from './../services/datostoken.service';
import { Usuario, UsuariosService } from './../services/usuarios.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
 

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[]; 
  buscadorUsuarios: string=""; 

  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total 
  
  public busquedaActiva: boolean=false; //esta un filtro de busqueda activo
  public buscando: boolean=false; //está buscando (cambio de boton de buscar)
  public buscandoAvanzado: boolean=false; //está buscando (cambio de boton de busqueda avanzada)
  public tag = []; //tag de busqueda
  public error: boolean=false; //indica si hay un error de respuesta en el backend
  public mensajeError: string=''; //indica el mensaje del error del backend
  public error2: boolean=false; //error que no sea el del ngoninit (el de abajo)

  //para el boton de Actualizar Activado
  public errorActivo: boolean=false;
  public loadingActivo: boolean=false;
  public msgActivo;

  
  constructor(public usuariosService: UsuariosService,public datostokenservice: DatosTokenService) { 
      for (let i = 16; i < 100; i++) { //para rellenar los arrays de checkbox de edades
        let newName = {id:i.toString(),};
        this.edad_min.push(newName);
        this.edad_max.push(newName);
      }
  } 

  ngOnInit() { 
    console.log("Entra en el ngOnInit");
    this.usuariosService.getUsers(this.bigCurrentPage,'',null).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.usuarios=res[0].data;
              console.log(this.usuarios);
              this.error=false;
            }
            if (res[0].status==204){ //no encontrado
              console.log(res[0].status);
              this.error=true;
              this.mensajeError="No tienes ningún usuario registrado en tu tienda";
            }
          }
           //this.accesocorrecto=true;        
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
              this.error=true;
              this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
        },   
    );
  }

  @ViewChild(UsuariosModalPerfilComponent) public modalPerfil:UsuariosModalPerfilComponent; //cogemos el componente para poder enviarle los datos

  showChildModal(usuario){
    this.modalPerfil.showChildModal(usuario, this.datostokenservice.token['id_tienda']); //llamamos al metodo del componente hijo para que muestre la modal
    //this.modalPerfil.usuario=usuario; //asignamos los datos del usuario a la variable input del componente hijo
  }

  public setPage(pageNo: number): void {
    this.bigCurrentPage = pageNo;
  }

  public buscar(){
    if(this.buscadorUsuarios!=''){
      
      this.buscando=true;
      for (var filtro in this.filtro){ //Vaciamos el filtro para que no se quede guardada la etiqueta de la busqueda avanzada
        this.filtro[filtro]="";
         if(filtro=="fecha_max") this.edadminima="";
         if(filtro=="fecha_min") this.edadmaxima="";
      }
      this.filtro["nombre"]=this.buscadorUsuarios;
      console.log(this.buscadorUsuarios);
      this.usuariosService.getUsers(1,this.buscadorUsuarios,null).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[];
                this.usuarios=res[0].data;
                console.log(this.usuarios);
                this.error=false; this.error2=false;
                this.busquedaActiva=true;
                this.tag.push("Nombre: "+this.buscadorUsuarios);
                if(this.bigCurrentPage!=1)
                  this.bigCurrentPage=1;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.error2=true;
                this.mensajeError="No hay ningún usuario que coincida con el término: "+this.buscadorUsuarios;
              }
            }
            this.buscando=false;        
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
                this.error2=true;
                this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
                this.buscando=false;   
          },   
      );
    }
  }
  
  //Busqueda avanzada
  public filtro: Object={ nombre:'', sexo:'', cp:'', edad_min:'', edad_max:'',fecha_max:'',fecha_min:''}
  public edadminima:string=''; //guarda la edad minima del form
  public edadmaxima:string=''; //edad maxima del form
  public edad_min = []; //creamos un array de edades
  public edad_max = [];

  public busquedaAvanzada(){
    console.log("Entra a busquedaAvanzada");
    (this.edadminima!='') ? this.filtro["fecha_max"]=this.buildDates(this.edadminima) :this.filtro["fecha_max"]='' ;
    (this.edadmaxima!='') ? this.filtro["fecha_min"]=this.buildDates(this.edadmaxima) :this.filtro["fecha_min"]='' ;
    if(this.filtro["nombre"]!="" || this.filtro["sexo"]!="" || this.filtro["cp"]!="" || this.filtro["fecha_max"]!="" || this.filtro["fecha_min"]!=""){
     
      this.buscandoAvanzado=true;
      console.log(this.buscadorUsuarios);
      this.usuariosService.getUsers(1,this.buscadorUsuarios,this.filtro).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[];
                this.usuarios=res[0].data;
                console.log(this.usuarios);
                this.error=false; this.error2=false;
                this.busquedaActiva=true;
                //this.tag.push(this.filtro);
                this.construirEtiquetas();
                if(this.bigCurrentPage!=1)
                  this.bigCurrentPage=1;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.error2=true;
                this.mensajeError="No hay ningún usuario que coincida con los criterios de búsqueda";
              }
            }
            this.buscandoAvanzado=false;        
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
                this.error2=true;
                this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
                this.buscandoAvanzado=false;   
          },   
      );
    }
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

  
  construirEtiquetas(){
    this.tag=[];
    console.log("ENTRA A CONSTRUIR ETIQUETAS");
    if (this.filtro["nombre"]) this.tag.push("Nombre: " + this.filtro["nombre"]);
    if (this.filtro["sexo"]!=''){
       if (this.filtro["sexo"]=='h') this.tag.push("Sexo: Hombre");
       if (this.filtro["sexo"]=='m') this.tag.push("Sexo: Mujer");
    }
    if (this.filtro["cp"]!='') this.tag.push("CP: " + this.filtro["cp"]);
    if (this.edadminima!='') this.tag.push("Edad mínima: " + this.edadminima);
    if (this.edadmaxima!='') this.tag.push("Edad máxima: " + this.edadmaxima);
  }

  public eliminarEtiqueta(index){
    let i=0;
    console.log(this.filtro);
    for (var filtro in this.filtro){
      if(this.filtro[filtro]){ 
        if(i==index){
          this.filtro[filtro]="";
          if(filtro=="fecha_max") this.edadminima="";
          if(filtro=="fecha_min") this.edadmaxima="";
        }
        i++;
      }
    }
    this.construirEtiquetas();
  }

  public eliminarBusqueda(index){
    this.eliminarEtiqueta(index);
    this.error=this.error2=false;

     if(this.bigCurrentPage==1){ //solo se ejecuta cuando no cambia la pagina
          this.usuariosService.getUsers(1,"",this.filtro).subscribe(
            res =>{
              console.log(res);  
              if(res[0]){
                if (res[0].status==200){ //todo bien
                  this.usuarios=res[0].data;
                  console.log(this.usuarios);
                }
              }
            },
            err=>{ //Error de conexion con el servidor
                console.log(err);
                  this.error=true;
                  this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
            }, 
        );
     }

     
     this.bigCurrentPage=1;
    // this.buscadorUsuarios="";
  }

 
 //Aqui llamaremos al constructor
  public pageChanged(event: any): void {
    this.error=false;
    this.error2=false;
    console.log('Pagina cambiada a: ' + event.page);
    //console.log('Items por pagina: ' + event.itemsPerPage);

    if(this.busquedaActiva==false && this.buscando==false && this.buscandoAvanzado==false){ //cuando tienes un filtro de busqueda
        this.usuariosService.getUsers(event.page,'',null).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.usuarios=res[0].data;
                console.log(this.usuarios); 
                this.error2=false;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.error2=true;
                this.mensajeError="No tienes ningún usuario registrado en tu tienda";
              }
            }
            //this.accesocorrecto=true;        
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
                this.error2=true;
                this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
          },   
        );
    }
    else{ //si no tienes filtro de busqueda
     
      this.usuariosService.getUsers(event.page,this.buscadorUsuarios,this.filtro).subscribe(
        res =>{
          console.log(res);  
          if(res[0]){
            if (res[0].status==200){ //todo bien
               this.busquedaActiva=true; 
              this.usuarios=res[0].data;
              console.log(this.usuarios);
              this.error=false;
             // this.tag.push(this.buscadorUsuarios);
            }
            if (res[0].status==204){ //no encontrado
              console.log(res[0].status);
              this.error2=true;
              this.mensajeError="Ningún resultado coincide con la búsqueda ";
              //this.eliminarBusqueda();
            }
          }
          this.buscando=this.buscandoAvanzado=false;       
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
              this.error2=true;
              this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
              this.buscando=this.buscandoAvanzado=false;   
        },
        
      );
      
    }

  }



  //Se llama cuando se cambia de posicion un switch. Enviamos el usuario y cambiamos su estado de eliminado
  changeActivo(usuario){
    if(usuario.Eliminado_usuario==1) usuario.Eliminado_usuario=0;
    else if (usuario.Eliminado_usuario==0) usuario.Eliminado_usuario=1;
    //console.log(usuario);
  }

  //enviamos todos los usuarios para que actualice su estado de eliminado o no
  updateUserActivo(){
    this.loadingActivo=true;
    this.usuariosService.updateStateActivo(this.usuarios).subscribe(
      res =>{
        console.log("Actualizado correctamente");
        this.loadingActivo=false;
        this.errorActivo=false;
        this.msgActivo="Los datos se han actualizado correctamente";  
      },
      err=>{ //Error de conexion con el servidor
          console.log(err);
          this.loadingActivo=false;
          this.errorActivo=true;
          this.msgActivo="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";   
      },   
    );
  }
}
  