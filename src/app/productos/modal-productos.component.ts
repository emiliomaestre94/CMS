import { ImagenesAPIService } from './../services/imagenesapi.service';
import { YoutubeModalComponent } from './youtube-modal.component';
import { OfertasService } from './../services/ofertas.service';
import { ProductosService, ImageProducto } from './../services/productos.service';
import { Component, OnInit,ViewChild, ViewChildren,Inject, ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { DatosTokenService } from './../services/datostoken.service';
import { AngularFire, FirebaseApp } from 'angularfire2';
import * as moment from 'moment';



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
    
    public oferta: Object={
      Orden:1,
      P_oferta_oferta_producto:'',
      Fecha_inicio_oferta_producto:'',
      Fecha_fin_oferta_producto:'',
      Descripcion_oferta_producto:'',
      Foto_oferta_producto:'asdasdasdasd',
      Estado_oferta_producto:'1',
      Eliminado_oferta_producto:'0',
    }
    
  imagesProducto: ImageProducto[];
  public imageAux; // Aqui guardamos el src de la la imagen del producto (para metodo borders)
  public imageSelected: boolean=false; // Indica si hay imageSelected algun elemento
  public idTienda;
  public imageSrc;
  public ofertaActiva=false; // booleano que indica si tiene una oferta activa o no el producto
  public tabselected; //indica que tab es el seleccionado

  public myCount="PRUEBITAAAAAAAAA";

  @ViewChild('productoDetalleModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide 
  @ViewChild(YoutubeModalComponent) public modalYoutube:YoutubeModalComponent; //cogemos el componente para poder enviarle los datos
  @ViewChildren('imageAPI') imagesDOM; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI
  @ViewChild('imageProducto') imageProducto; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI
  @ViewChild('staticTabs') staticTabs; 

  firebase:any;//variable global de firebase

  constructor(public productosService: ProductosService, @Inject(FirebaseApp) firebase: any, public ofertasService: OfertasService, public datostokenservice: DatosTokenService,public imagenesApiService: ImagenesAPIService){
          this.idTienda=this.datostokenservice.token["id_tienda"];
          this.firebase = firebase;
  }

  public saveData(){
    console.log(this.oferta);
    this.uploadImage();
  }



  postOferta(){
    this.ofertasService.postOfertaProducto(this.oferta,this.idTienda,this.producto["Id_producto"]).subscribe(
        res =>{
          console.log(res);
        },
        err=>{ //Error de conexion con el servidor
          console.log(err);
        },
    );
  }




  public formatDate(){
    this.oferta["Fecha_inicio_oferta_producto"]= this.oferta["Fecha_inicio_oferta_producto"].split("T")[0];
    this.oferta["Fecha_fin_oferta_producto"]=this.oferta["Fecha_fin_oferta_producto"].split("T")[0];
  }


  public showYoutubeModal(){
    this.modalYoutube.showChildModal(this.producto["Nombre_producto"]); //llamamos al metodo del componente hijo para que muestre la modal
    //this.modalPerfil.usuario=usuario; //asignamos los datos del usuario a la variable input del componente hijo
  }

  public showChildModal(producto):void {
    this.msgAlert=this.msgAlertOferta=null;
    this.tabselected=1;
    this.staticTabs.tabs[0].active = true;

    this.oferta={};
    this.imageSrc='';
    console.log("ENTRAMOS A MODAL DE DETALLE DE PREODUCTO");
    console.log(producto);
    this.imagesProducto=null;
    this.producto=producto;
    if(producto.Id_oferta_producto!=null){
      this.ofertaActiva=true;
      this.imageSrc=producto.Foto_oferta_producto;
      this.oferta=producto;
      this.formatDate();
    }
    else{
      this.ofertaActiva=false;
    }
    this.getImagesAPI();
    this.childModal.show(); 
    //this.imageAux=this.producto["Imagen_producto"];
    this.imageProducto.nativeElement.src=this.producto["Imagen_producto"];
    this.imageSelected=false;
  }

  public hideChildModal():void {
    this.childModal.hide();
  }


  public errorUpdateOferta: boolean=false;
  public loadingUpdateOferta: boolean=false;
  public msgAlertOferta;

  updateOferta(eliminado){
    console.log("updateOferta");
    if(eliminado==1) this.oferta["Eliminado_oferta_producto"]=1;
    else this.oferta["Eliminado_oferta_producto"]=0;
    this.loadingUpdateOferta=true;
    this.ofertasService.putOfertaProducto(this.oferta).subscribe(
        res =>{
          console.log(res);
          this.errorUpdateOferta=false;
          this.loadingUpdateOferta=false;
          this.msgAlertOferta="Los datos se han actualizado correctamente";  
        },
        err=>{ //Error de conexion con el servidor
          console.log(err);
          this.errorUpdateOferta=true;
          this.loadingUpdateOferta=false;
          this.msgAlertOferta="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";       
        },
    );
  }
 


  public errorUpdateProducto: boolean=false;
  public loadingUpdateProducto: boolean=false;
  public msgAlert;

  public updateProducto(){
    this.loadingUpdateProducto=true;
    if(this.imageSelected==true){
      this.producto["Imagen_producto"]= this.imageAux;
    }
    console.log("updateProducto");
    this.productosService.updateProducto(this.producto).subscribe(
      res =>{
          console.log(res);
          this.errorUpdateProducto=false;
          this.loadingUpdateProducto=false;
          this.msgAlert="Los datos se han actualizado correctamente";  
        }, 
      err=>{ 
          console.log(err);
          this.errorUpdateProducto=true;
          this.loadingUpdateProducto=false;
          this.msgAlert="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";       
      },    
    ); 
  }
 /*
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
  */


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

   @ViewChild('image') el:ElementRef; //cogemos el input del dom
  storageref;
  storage;
  path;

  uploadImage(){
    console.log(this.el);
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.files[0]);
    var files = this.el.nativeElement.files[0];
   
    if(files){
      this.path="images/Oferta/Producto/"+"OfertaProducto_"+this.producto["Id_oferta_producto"]+"_"+moment().format()+"_"+files.name;
      console.log(this.path);
      var storageref= this.firebase.storage().ref().child(this.path);
      var image;
      let uploadTask=storageref.put(files);
      let newthis=this;
      uploadTask.on('state_changed', function(snapshot){}, 
      function(error) {
        console.log("Error subiendo la foto");
      }, function() {
        console.log("Foto subida correctamente");
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
        newthis.oferta["Foto_oferta_producto"]=downloadURL;
        newthis.postOferta();
      });
    }

  }

 

 
  files;
  imageloaded: boolean=false//si hay una fotocargada
  handleInputChange(foto) {
    this.files = foto.target.files;
    if (this.files[0]) {
      let reader = new FileReader();
      reader.onload = (e : any) => {
        this.imageSrc = e.target.result;
      }
      reader.readAsDataURL(foto.target.files[0]);
      this.imageloaded=true;
    }
    else{
     this.imageSrc=this.oferta["Foto_oferta_producto"];
     this.imageloaded=false;
    }

  } 
 
  cancelImageLoad(){
    this.imageSrc=this.oferta["Foto_oferta_producto"];
    this.el.nativeElement.value=null;
    this.imageloaded=false;
  }

   
  selectTab(number){
   console.log("CLIIIICK");
   this.tabselected=number;
   console.log(this.tabselected);
  }


 videoChange(event) {
    console.log("El evento es "+event);
    this.producto["URL_video_producto"]=event;
  }

  filtrarNombre(nombre){
    var res = nombre.split(" ");
    return res[0];
  }
  getImagesAPI(){
      var filtroNombre=this.filtrarNombre(this.producto["Nombre_producto"]);
      console.log("filtronombre es "+filtroNombre);
      this.imagenesApiService.search(filtroNombre).subscribe(
        res =>{
          console.log("IMAGENES APIIIIIIIIII");
          console.log(res);
          this.imagesProducto=res[0].data.hits;     
        },
        err=>{ //Error de conexion con el servidor
          console.log(err);
        },
    );
  }

}
