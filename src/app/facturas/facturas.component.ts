import { ModalDetalleFacturasComponent } from './modal-detalle-facturas.component';
import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
import { Factura, FacturasService } from './../services/facturas.service';
import { Component, OnInit, ViewChild,ViewChildren} from '@angular/core';
import { DatosTokenService } from './../services/datostoken.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
}) 
 

export class FacturasComponent implements OnInit {

  //errores y mensaje de Eliminar Facturas
  public errorActivo: boolean=false;
  public loadingActivo: boolean=false;
  public msgActivo;
 
  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total

  public facturas: Factura[];
  public buscadorFacturas: string="";
  public idTienda:string; 
 
  public mensajeError: string=''; //indica el mensaje del error del backend
  public error: boolean=false; //indica si hay un error de respuesta en el backend
  public error2: boolean=false; //error que no sea el del ngoninit (el de abajo)

  public busquedaActiva: boolean=false; //esta un filtro de busqueda activo
  public buscando: boolean=false; //está buscando (cambio de boton de buscar)
  public buscandoAvanzado: boolean=false; //está buscando (cambio de boton de busqueda avanzada)
  public tag = []; //tag de busqueda
  public filtro: Object={ fecha_desde:'', fecha_hasta:'', precio_min:'', precio_max:''}

  constructor(public facturasService: FacturasService, public datostokenservice: DatosTokenService) { } 

  ngOnInit() {
    this.idTienda=this.datostokenservice.token["id_tienda"];  
    console.log("Entra en el ngOnInit");
      this.facturasService.getFacturas(this.idTienda,this.bigCurrentPage,'',null).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.facturas=res[0].data.Facturas;
              console.log(this.facturas);
              this.error=false;
            }
            if (res[0].status==204){ //no encontrado
              console.log(res[0].status);
              this.error=true;
              this.mensajeError="No tienes ninguna factura registrada en tu tienda";
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
    if(this.buscadorFacturas!=''){
      this.buscando=true;
      for (var filtro in this.filtro){ //Vaciamos el filtro para que no se quede guardada la etiqueta de la busqueda avanzada
        this.filtro[filtro]="";
      }
      console.log(this.buscadorFacturas);
      this.facturasService.getFacturas(this.idTienda,1,this.buscadorFacturas,null).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[]; 
                this.facturas=res[0].data.Factura;
                console.log(this.facturas);
                this.error=false; this.error2=false;
                this.busquedaActiva=true;
                this.tag.push("Nº Factura: "+this.buscadorFacturas);
                if(this.bigCurrentPage!=1)
                  this.bigCurrentPage=1;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.error2=true;
                this.mensajeError="No hay ninguna factura con el número: " + this.buscadorFacturas;
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
    if(this.filtro["fecha_desde"]!="" || this.filtro["fecha_hasta"]!="" || this.filtro["precio_min"]!="" || this.filtro["precio_max"]!=""){
      this.buscandoAvanzado=true;
      this.facturasService.getFacturas(this.idTienda,1,'',this.filtro).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[];
                this.facturas=res[0].data.Facturas;
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
                this.mensajeError="No hay ninguna factura que coincida con los criterios de búsqueda";
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
    if (this.filtro["precio_min"]!='') this.tag.push("Precio mínimo: " + this.filtro["precio_min"]);
    if (this.filtro["precio_max"]!='') this.tag.push("Precio máximo: " + this.filtro["precio_max"]);
  }

  public eliminarBusqueda(index){
    this.eliminarEtiqueta(index);
    this.error=this.error2=false;
     if(this.bigCurrentPage==1){ //solo se ejecuta cuando no cambia la pagina
          this.facturasService.getFacturas(this.idTienda,1,"",this.filtro).subscribe(
            res =>{
              console.log(res);  
              if(res[0]){
                if (res[0].status==200){ //todo bien
                  this.facturas=res[0].data.Facturas;
                  console.log(this.facturas);
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

  @ViewChild(ModalDetalleFacturasComponent) public modalDetalle:ModalDetalleFacturasComponent; //cogemos el componente para poder enviarle los datos
  showChildModal(factura){
    this.modalDetalle.showChildModal(factura); //llamamos al metodo del componente hijo para que muestre la modal
    //this.modalPerfil.usuario=usuario; //asignamos los datos del usuario a la variable input del componente hijo
  }

  public IdFacturas=[]; //array que contiene el id de los usuarios que checkeamos
  @ViewChildren('checkboxUser') checkboxUsers; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI

  public selectAllFacturas(event){
      this.IdFacturas = [];
      for(let checkboxusers of this.checkboxUsers._results){

        if(event.target.checked==true){
         checkboxusers.nativeElement.checked=true;
         let idFactura= +checkboxusers.nativeElement.value
         this.selectUserBucle(checkboxusers,idFactura);
        
        } 
        else{
          checkboxusers.nativeElement.checked=false;
          this.IdFacturas=[];
        }
      //console.log(checkboxusers);
    }
    console.log(this.IdFacturas);
  }

  selectUserBucle(event,idFactura){
      //console.log("entra2");
     if(event.nativeElement.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdFacturas.push(idFactura);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdFacturas.indexOf(idFactura, 0);
        if (index > -1) {
          this.IdFacturas.splice(index, 1);
        }
     }
    // console.log(this.IdFacturas);
   }

   selectUser(event,idFactura){
     console.log("entra");
     if(event.target.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdFacturas.push(idFactura);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdFacturas.indexOf(idFactura, 0);
        if (index > -1) {
          this.IdFacturas.splice(index, 1);
        }
     }
     console.log(this.IdFacturas);
   }

    deleteFacturas(){
      this.loadingActivo=true;
      if(this.IdFacturas!=[]){
        this.facturasService.deteleFacturas(this.idTienda,this.IdFacturas).subscribe(
          res =>{
            console.log(res); 
            this.updateTable();
           
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
   public updateTable(){             
        this.facturasService.getFacturas(this.idTienda,this.bigCurrentPage,'',null).subscribe(
          res =>{
            console.log(res);   
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.facturas=res[0].data.Facturas;
                this.error=false;
                this.loadingActivo=false;
                this.errorActivo=false;
                this.msgActivo="Las facturas se han eliminado correctamente";   
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.error=true;
                this.facturas=null;
                this.loadingActivo=false;
                this.errorActivo=false;
                this.mensajeError="No tienes ninguna factura registrada en tu tienda";
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


}