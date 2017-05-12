import { Oferta, OfertasService } from './../services/ofertas.service';
import { ModalDetalleOfertasComponent } from './modal-detalle-ofertas.component';
import { ModalOfertasComponent } from './modal-ofertas.component';
import { Component, OnInit,ViewChild, ViewChildren } from '@angular/core';
import { DatosTokenService } from './../services/datostoken.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit { 
  //para el boton de Actualizar Activado
  public errorActivo: boolean=false;
  public loadingActivo: boolean=false;
  public msgActivo;

  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total

  public ofertas: Oferta[];
  public buscadorOfertas: string=""; 
  public idTienda: string;

  public mensajeError: string=''; //indica el mensaje del error del backend
  public error: boolean=false; //indica si hay un error de respuesta en el backend
  public error2: boolean=false; //error que no sea el del ngoninit (el de abajo)  

  public busquedaActiva: boolean=false; //esta un filtro de busqueda activo
  public buscando: boolean=false; //está buscando (cambio de boton de buscar)
  public buscandoAvanzado: boolean=false; //está buscando (cambio de boton de busqueda avanzada)
  public tag = []; //tag de busqueda
  public filtro: Object={ fecha_desde:'', fecha_hasta:''}  

  constructor(public ofertasService: OfertasService,public datostokenservice: DatosTokenService, ) { }

  ngOnInit() { 
    this.ofertas=null;
    this.IdOfertas=this.IdOfertasDebug=[];
    this.idTienda=this.datostokenservice.token["id_tienda"];
        this.ofertasService.getOfertas(this.idTienda,this.bigCurrentPage,'',null).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.ofertas=res[0].data;
              this.error=false;
            } 
            if (res[0].status==204){ //no encontrado
              console.log(res[0].status);
              this.error=true;
              this.mensajeError="No tienes ninguna oferta registrada en tu tienda";
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

  public buscar(){ 
    if(this.buscadorOfertas!=''){
      this.buscando=true;
      for (var filtro in this.filtro){ //Vaciamos el filtro para que no se quede guardada la etiqueta de la busqueda avanzada
        this.filtro[filtro]="";
      }
      console.log(this.buscadorOfertas);
      this.ofertasService.getOfertas(this.idTienda,1,this.buscadorOfertas,null).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[]; 
                this.ofertas=res[0].data;
                console.log(this.ofertas);
                this.error=false; this.error2=false;
                this.busquedaActiva=true;
                this.tag.push("Código: "+this.buscadorOfertas);
                if(this.bigCurrentPage!=1)
                  this.bigCurrentPage=1;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.error2=true;
                this.mensajeError="No hay ninguna oferta con el código: " + this.buscadorOfertas;
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

  public busquedaAvanzada(){
    if(this.filtro["fecha_desde"]!="" || this.filtro["fecha_hasta"]!=""){
      this.buscandoAvanzado=true;
      this.ofertasService.getOfertas(this.idTienda,1,'',this.filtro).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[];
                this.ofertas=res[0].data;
                //console.log(this.productos);
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
                this.mensajeError="No hay ninguna oferta que coincida con los criterios de búsqueda";
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

    public construirEtiquetas(){
    this.tag=[];
    console.log("ENTRA A CONSTRUIR ETIQUETAS");
    if (this.filtro["fecha_desde"]!='') this.tag.push("Fecha desde: " + this.filtro["fecha_desde"]);
    if (this.filtro["fecha_hasta"]!='') this.tag.push("Fecha hasta: " + this.filtro["fecha_hasta"]);
  } 
 
  public eliminarBusqueda(index){
    this.eliminarEtiqueta(index);
    this.error=this.error2=false;
     if(this.bigCurrentPage==1){ //solo se ejecuta cuando no cambia la pagina
          this.ofertasService.getOfertas(this.idTienda,1,"",this.filtro).subscribe(
            res =>{
              console.log(res);  
              if(res[0]){
                if (res[0].status==200){ //todo bien
                  this.ofertas=res[0].data;
                  console.log(this.ofertas);
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
     //this.buscadorProductos=""; //ATEEEEEENCION
  }

  public eliminarEtiqueta(index){
    let i=0;
    console.log(this.filtro);
    for (var filtro in this.filtro){
      if(this.filtro[filtro]){ 
        if(i==index){
          this.filtro[filtro]="";
        }
        i++;
      }
    }
    this.construirEtiquetas(); 
  }


  


  public IdOfertas=[]; //array que contiene el id de los usuarios que checkeamos
  @ViewChildren('checkboxUser') checkboxUsers; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI

  public selectAllOfertas(event){
      this.IdOfertas = [];
      for(let checkboxusers of this.checkboxUsers._results){

        if(event.target.checked==true){
         checkboxusers.nativeElement.checked=true;
         let idOferta= +checkboxusers.nativeElement.value
         this.selectUserBucle(checkboxusers,idOferta);
        
        }
        else{
          checkboxusers.nativeElement.checked=false;
          this.IdOfertas=[];
        }
      //console.log(checkboxusers);
    }
    console.log(this.IdOfertas);
  }

  selectUserBucle(event,idOferta){
      //console.log("entra2");
     if(event.nativeElement.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdOfertas.push(idOferta);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdOfertas.indexOf(idOferta, 0);
        if (index > -1) {
          this.IdOfertas.splice(index, 1);
        }
     }
    // console.log(this.IdOfertas);
   }

   selectUser(event,idOferta){
     console.log("entra");
     if(event.target.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdOfertas.push(idOferta);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdOfertas.indexOf(idOferta, 0);
        if (index > -1) {
          this.IdOfertas.splice(index, 1);
        }
     }
     console.log(this.IdOfertas);
   }

    deleteOfertas(){
      this.loadingActivo=true;
      if(this.IdOfertas!=[]){
        this.ofertasService.deteleOfertasUser(this.idTienda,this.IdOfertas).subscribe(
          res =>{
            console.log(res); 
            this.updateTable(null);
           
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

   public updateTable(origen){
              
        this.ofertasService.getOfertas(this.idTienda,this.bigCurrentPage,'',null).subscribe(
          res =>{
            console.log(res);   
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.ofertas=res[0].data;
                if(!origen){
                  this.error=false;
                  this.loadingActivo=false;
                  this.errorActivo=false;
                  this.msgActivo="Las ofertas se han eliminado correctamente";
                }  
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                if(!origen){
                  this.error=true;
                  this.ofertas=null;
                  this.loadingActivo=false;
                  this.errorActivo=false;
                  this.mensajeError="No tienes ninguna oferta registrada en tu tienda";
                }  
              }
            }  
            //this.accesocorrecto=true;        
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
              if(!origen){
                this.error=true;
                this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
              }
          },   
      );
   }

    public IdOfertasDebug=[]; //array que contiene el id de los usuarios que checkeamos
    public ofertasDebug: Oferta[];
    recuperarOfertas(){
        this.ofertasService.getOfertasDebug(this.idTienda,this.bigCurrentPage,'',null).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.ofertasDebug=res[0].data;
              for (let ofertas of this.ofertasDebug){
                this.IdOfertasDebug.push(ofertas["Id_oferta_usuario"]);
              }
              console.log("IdOfertasDebug es: ");
              console.log(this.IdOfertasDebug);
                this.ofertasService.recuperarOfertasUser(this.idTienda,this.IdOfertasDebug).subscribe(
                  res =>{
                    console.log(res); 
                    this.ngOnInit() 
                  },
                  err=>{ //Error de conexion con el servidor
                      console.log(err);
                  },   
              );
            }
          } 
           //this.accesocorrecto=true;        
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
        },   
    );
   }



   public ActualizarLista(){
     console.log("Entra a actualizar Lista");
     this.updateTable(1);
   }




  @ViewChild(ModalOfertasComponent) public modalOfertas:ModalOfertasComponent; //cogemos el componente para poder enviarle los datos
  @ViewChild(ModalDetalleOfertasComponent) public modalClientesOfertados:ModalDetalleOfertasComponent; //cogemos el componente para poder enviarle los datos

  showChildModal(){
    this.modalOfertas.showChildModal();
  }

  showChildModalClientesOfertados(oferta){
    this.modalClientesOfertados.showChildModal(oferta,this.idTienda,);
  }

  

}
   