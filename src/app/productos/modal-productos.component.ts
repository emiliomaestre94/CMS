import { ProductosService, ImageProducto } from './../services/productos.service';
import { Component, OnInit,ViewChild, ViewChildren } from '@angular/core';
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
  public imageAux; // Aqui guardamos el src de la la imagen del producto (para metodo borders)
  public imageSelected: boolean=false; // Indica si hay imageSelected algun elemento

  @ViewChild('productoDetalleModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide 
  @ViewChildren('imageAPI') imagesDOM; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI
  @ViewChild('imageProducto') imageProducto; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI
  
  constructor(public productosService: ProductosService){}

  public showChildModal(producto):void {
    this.imagesProducto=null;
    this.producto=producto;
    this.getImagesAPI();
    this.childModal.show(); 
    //this.imageAux=this.producto["Imagen_producto"];
    this.imageProducto.nativeElement.src=this.producto["Imagen_producto"];
    this.imageSelected=false;
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

  public updateProducto(){
    if(this.imageSelected==true){
      this.producto["Imagen_producto"]= this.imageAux;
    }
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





  
  public removeBorder(){
    for(let imagesDOM of this.imagesDOM._results){
      //console.log(imagesDOM.nativeElement);
      imagesDOM.nativeElement.style.border="none";
    }
  }

  public selectImageAPI(event){
    this.imageSelected=true;
    console.log(event.target.currentSrc);
    console.log(this.imageProducto.nativeElement.src);
    this.imageProducto.nativeElement.src=event.target.currentSrc; //asignamos el src a la imagen del producto
    this.imageAux=event.target.currentSrc;
    this.removeBorder();
    event.target.style.border= "2px solid black"; //añadimos borde
  }


  cancelSelectImage(){
    this.imageSelected=false;
    this.imageProducto.nativeElement.src=this.producto["Imagen_producto"];
    this.removeBorder();
  }





 
 
}
