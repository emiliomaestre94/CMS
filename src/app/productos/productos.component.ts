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
          }
          if (res[0].status==204){ //no encontrado
              console.log("No hay usuarios");
          }
        }
        
      },
      err=>{  
          console.log(err);
      },   
    );
  }

    //Se llama cuando se cambia de posicion un switch. Enviamos el usuario y cambiamos su estado de eliminado
  changeActivo(producto){
    if(producto.Eliminado_producto==1) producto.Eliminado_producto=0;
    else if (producto.Eliminado_producto==0) producto.Eliminado_producto=1;
    console.log(producto);
  }

  updateProductoActivo(){
    this.productosService.updateStateActivo(this.productos).subscribe(
      res =>{
        console.log("Actualizado correctamente");

      },
      err=>{ //Error de conexion con el servidor
          console.log(err);
  
      },   
    );
  }
 
}
