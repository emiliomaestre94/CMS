import { ProductosDetalleModalComponent } from './modal-productos.component';
import { DatosTokenService } from './../services/datostoken.service';
import { Producto, ProductosService } from './../services/productos.service';
import * as moment from 'moment';
import { Component, OnInit, ViewChild} from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
}) 
export class ProductosComponent implements OnInit {
  
  //Para los input date
  date: DateModel;
  date2: DateModel;
  options: DatePickerOptions;

  //Pagination
  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total 
  public mensajeError: string=''; //indica el mensaje del error del backend
  public error: boolean=false; //indica si hay un error de respuesta en el backend

  idTienda //id de la tienda (le asignamos el valor de datostokenservice)
  productos: Producto[]; //productos será un vector de Objetos de la clase Producto
 
  constructor(public productosService: ProductosService, public datostokenservice: DatosTokenService) { 
        this.options = new DatePickerOptions();
  }

  @ViewChild(ProductosDetalleModalComponent) public modalDetalle:ProductosDetalleModalComponent; //cogemos el componente para poder enviarle los datos

  showChildModal(producto){
    this.modalDetalle.showChildModal(producto); //llamamos al metodo del componente hijo para que muestre la modal
    //this.modalPerfil.usuario=usuario; //asignamos los datos del usuario a la variable input del componente hijo
  }

  ngOnInit() {
    this.idTienda= this.datostokenservice.token['id_tienda'];

    this.productosService.getProductos(this.idTienda).subscribe(
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

    //Se llama cuando se cambia de posicion un switch. Enviamos el usuario y cambiamos su estado de eliminado
  changeActivo(producto){
    if(producto.Eliminado_producto==1) producto.Eliminado_producto=0;
    else if (producto.Eliminado_producto==0) producto.Eliminado_producto=1;
    console.log(producto);
  }

  public errorActivo: boolean=false;
  public loadingActivo: boolean=false;
  public msgActivo;
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
 
}
