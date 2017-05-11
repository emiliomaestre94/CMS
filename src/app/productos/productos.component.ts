import { ProductosDetalleModalComponent } from './modal-productos.component';
import { DatosTokenService } from './../services/datostoken.service';
import { Producto, ProductosService } from './../services/productos.service';
import * as moment from 'moment';
import { Component, OnInit, ViewChild} from '@angular/core';

 


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
}) 
export class ProductosComponent implements OnInit {
  
  //errores y mensaje de activar y desactivar productos
  public errorActivo: boolean=false;
  public loadingActivo: boolean=false;
  public msgActivo;
 
  //Paginacion
  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total 
  
  public mensajeError: string=''; //indica el mensaje del error del backend
  public error: boolean=false; //indica si hay un error de respuesta en el backend
  public error2: boolean=false; //error que no sea el del ngoninit (el de abajo)

  idTienda //id de la tienda (le asignamos el valor de datostokenservice)
  productos: Producto[]; //productos será un vector de Objetos de la clase Producto
  buscadorProductos: string="";
  
  public busquedaActiva: boolean=false; //esta un filtro de busqueda activo
  public buscando: boolean=false; //está buscando (cambio de boton de buscar)
  public buscandoAvanzado: boolean=false; //está buscando (cambio de boton de busqueda avanzada)
  public tag = []; //tag de busqueda
  public filtro: Object={ codigo:'', nombre:'', precio_min:'', precio_max:''}
  

  constructor(public productosService: ProductosService, public datostokenservice: DatosTokenService) { }

  ngOnInit() {
    this.idTienda= this.datostokenservice.token['id_tienda'];

    this.productosService.getProductos(this.idTienda,this.bigCurrentPage,'',null).subscribe( //hacemos la llamada al servidor
      res =>{
        console.log(res);  
        if(res[0]){
          if (res[0].status==200){ //todo bien
            this.productos=res[0].data.Productos
            console.log(this.productos);
            this.error=false;
            
          }
          if (res[0].status==204){ //no encontrado
              console.log("No hay usuarios");
              this.error=true;
              this.mensajeError="No tienes ningún usuario registrado en tu tienda";
          }
        }
        
      }, 
      err=>{  
          console.log(err);
          this.error=true;
          this.mensajeError="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
      },   
    );
  }

  public buscar(){
    if(this.buscadorProductos!=''){
      this.buscando=true;
      for (var filtro in this.filtro){ //Vaciamos el filtro para que no se quede guardada la etiqueta de la busqueda avanzada
        this.filtro[filtro]="";
      }
      this.filtro["nombre"]=this.buscadorProductos;
      console.log(this.buscadorProductos);
      this.productosService.getProductos(this.idTienda,1,this.buscadorProductos,null).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[]; 
                this.productos=res[0].data.Productos;
                console.log(this.productos);
                this.error=false; this.error2=false;
                this.busquedaActiva=true;
                this.tag.push("Nombre: "+this.buscadorProductos);
                if(this.bigCurrentPage!=1)
                  this.bigCurrentPage=1;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.error2=true;
                this.mensajeError="No hay ningún producto que coincida con el término: "+this.buscadorProductos;
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
    if(this.filtro["nombre"]!="" || this.filtro["codigo"]!="" || this.filtro["precio_min"]!="" || this.filtro["precio_max"]!=""){
      this.buscandoAvanzado=true;
      this.productosService.getProductos(this.idTienda,1,this.buscadorProductos,this.filtro).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.tag=[];
                this.productos=res[0].data.Productos;
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

  public construirEtiquetas(){
    this.tag=[];
    console.log("ENTRA A CONSTRUIR ETIQUETAS");
    if (this.filtro["nombre"]) this.tag.push("Nombre: " + this.filtro["nombre"]);
    if (this.filtro["codigo"]!='') this.tag.push("Código: " + this.filtro["codigo"]);
    if (this.filtro["precio_min"]!='') this.tag.push("Precio mínimo: " + this.filtro["precio_min"]);
    if (this.filtro["precio_max"]!='') this.tag.push("Precio máximo: " + this.filtro["precio_max"]);
  }

  public eliminarBusqueda(index){
    this.eliminarEtiqueta(index);
    this.error=this.error2=false;
     if(this.bigCurrentPage==1){ //solo se ejecuta cuando no cambia la pagina
          this.productosService.getProductos(this.idTienda,1,"",this.filtro).subscribe(
            res =>{
              console.log(res);  
              if(res[0]){
                if (res[0].status==200){ //todo bien
                  this.productos=res[0].data.Productos;
                  console.log(this.productos);
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

  public pageChanged(event: any): void {
    this.error=false;
    this.error2=false;
    console.log('Pagina cambiada a: ' + event.page);
    //console.log('Items por pagina: ' + event.itemsPerPage);

    if(this.busquedaActiva==false && this.buscando==false && this.buscandoAvanzado==false){ //cuando tienes un filtro de busqueda
        this.productosService.getProductos(this.idTienda,event.page,'',null).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.productos=res[0].data.Productos;
                console.log(this.productos); 
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
     
      this.productosService.getProductos(this.idTienda,event.page,this.buscadorProductos,this.filtro).subscribe(
        res =>{
          console.log(res);  
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.busquedaActiva=true; 
              this.productos=res[0].data.Productos;
              console.log(this.productos);
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
  changeActivo(producto){
    if(producto.Eliminado_producto==1) producto.Eliminado_producto=0;
    else if (producto.Eliminado_producto==0) producto.Eliminado_producto=1;
    console.log(producto);
  }


  //Se llama para hacer la llamada al servidor del estado activo o no de un producto
  updateProductoActivo(){
    this.loadingActivo=true;
    this.productosService.updateStateActivo(this.productos).subscribe(
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
  @ViewChild(ProductosDetalleModalComponent) public modalDetalle:ProductosDetalleModalComponent; //cogemos el componente para poder enviarle los datos
  showChildModal(producto){
    this.modalDetalle.showChildModal(producto); //llamamos al metodo del componente hijo para que muestre la modal
    //this.modalPerfil.usuario=usuario; //asignamos los datos del usuario a la variable input del componente hijo
  }
 
}
