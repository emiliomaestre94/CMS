import { ProductosService, ImageProducto } from './../services/productos.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'modal-detalle-producto',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosDetalleModalComponent {
  
    producto: Object={  //datos que recibimos del componente padre
      Id_producto:'',
      Codigo_producto:'',
      Nombre_producto:'',
      Precio_producto:'',
      Descripcion_producto:'',
      URL_video_producto:'',  
      Imagen_producto:''
    };

  imagesProducto: ImageProducto[];

  @ViewChild('productoDetalleModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide
  
  constructor(public productosService: ProductosService){}

  public showChildModal(producto):void {
    this.imagesProducto=null;
    this.producto=producto;
    this.getImagesAPI();
    this.childModal.show(); 
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  public updateProducto(){
    this.productosService.updateProducto(this.producto).subscribe(
      res =>{
          console.log(res);    
        },
      err=>{ 
          console.log(err);
      },   
    );
  }

  public getImagesAPI(){
    this.productosService.getImagesAPI(this.producto["Nombre_producto"]).subscribe(
      res =>{
          console.log(res);
          this.imagesProducto=res;      
        },
      err=>{ 
          console.log(err);
      },   
    );
  }

  





 
 
}
