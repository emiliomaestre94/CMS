import { UsuariosModalPerfilComponent } from './usuarios-modalperfil.component';
import { Router } from '@angular/router';
import { DatosTokenService } from './../services/datostoken.service';
import { Usuario, UsuariosService } from './../services/usuarios.service';
import { Component, OnInit, ViewChild  } from '@angular/core';

 

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
  public tag: string; //tag de busqueda
  public error: boolean=false; //indica si hay un error de respuesta en el backend
  public mensajeError: string=''; //indica el mensaje del error del backend
  public error2: boolean=false; //error que no sea el del ngoninit (el de abajo)

  //para el boton de Actualizar Activado
  public errorActivo: boolean=false;
  public loadingActivo: boolean=false;
  public msgActivo;

  constructor(public usuariosService: UsuariosService,public datostokenservice: DatosTokenService, public router: Router) { }

  
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
      console.log(this.buscadorUsuarios);
      this.usuariosService.getUsers(1,this.buscadorUsuarios).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.usuarios=res[0].data;
                console.log(this.usuarios);
                this.error=false; this.error2=false;
                this.busquedaActiva=true;
                this.tag= this.buscadorUsuarios;
                if(this.bigCurrentPage!=1)
                  this.bigCurrentPage=1;
              }
              if (res[0].status==206){ //no encontrado
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

  public eliminarBusqueda(){
    this.error=this.error2=this.busquedaActiva=false;

     if(this.bigCurrentPage==1){ //solo se ejecuta cuando no cambia la pagina
          this.usuariosService.getUsers(1,'').subscribe(
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
     this.buscadorUsuarios="";
  }

 
 //Aqui llamaremos al constructor
  public pageChanged(event: any): void {
    this.error=false;
    this.error2=false;
    console.log('Pagina cambiada a: ' + event.page);
    //console.log('Items por pagina: ' + event.itemsPerPage);

    if(this.busquedaActiva==false && this.buscando==false){ //cuando tienes un filtro de busqueda
        this.usuariosService.getUsers(event.page,'').subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.usuarios=res[0].data;
                console.log(this.usuarios);
                this.error2=false;
              }
              if (res[0].status==206){ //no encontrado
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
     
      this.usuariosService.getUsers(event.page,this.buscadorUsuarios).subscribe(
        res =>{
          console.log(res);  
          if(res[0]){
            if (res[0].status==200){ //todo bien
               this.busquedaActiva=true; 
              this.usuarios=res[0].data;
              console.log(this.usuarios);
              this.error=false;
              this.tag= this.buscadorUsuarios;
            }
            if (res[0].status==206){ //no encontrado
              console.log(res[0].status);
              this.error2=true;
              this.mensajeError="Ningún resultado coincide con la búsqueda ";
              //this.eliminarBusqueda();
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

  ngOnInit() {
    console.log("Entra en el ngOnInit");
    this.usuariosService.getUsers(this.bigCurrentPage,'').subscribe(
        res =>{
          console.log(res);  
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.usuarios=res[0].data;
              console.log(this.usuarios);
              this.error=false;
            }
            if (res[0].status==206){ //no encontrado
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
  