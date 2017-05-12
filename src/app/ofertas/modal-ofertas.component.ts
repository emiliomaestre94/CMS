import { OfertasService } from './../services/ofertas.service';
import {Producto, ProductosService } from './../services/productos.service';
import { DatosTokenService } from './../services/datostoken.service';
import { Usuario,UsuariosService } from './../services/usuarios.service';
import { Component, ElementRef, ViewChild, ViewChildren, Inject, EventEmitter, Output } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { AngularFire, FirebaseApp } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'modal-oferta',
  templateUrl: './modal-ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
}) 
export class ModalOfertasComponent {
   
  @ViewChild('ModalOfertas') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide
  @ViewChildren('checkboxUser') checkboxUsers; //te coge todos los elementos del DOM que tengan la etiqueta imageAPI
  @ViewChild('staticTabs') staticTabs; 

  public usuarios:Usuario[];//objeto que guardara el objeto de usuarios;
  public productos:Producto[];//objeto que guardara el objeto de usuarios;

  public filtro: Object={
    nombre:'',
    sexo:'',
    cp:'',
    edad_min:'',
    edad_max:'',
  }
  public oferta: Object={
    Orden:1,
    Precio:'',
    Fecha_inicio:'',
    Fecha_final:'',
    Descripcion:'',
    Imagen:'',
    Estado:'1', 
    Eliminado:'0',
  }
  public edad_min = []; //creamos un array de edades
  public edad_max = [];
  public IdUsuarios=[]; //array que contiene el id de los usuarios que checkeamos
  public idProducto; //id del producto que enviamos al servicio. Mas adelante será un array para poder añadir varios productos
  public idTienda: string; //id de la tienda que cogemos de datostokenservice
  public edadminima:string=''; //guarda la edad minima del form
  public edadmaxima:string=''; //edad maxima del form
  public imageSrc; //src de la imagen de la oferta

  public loadingUsers=false;

  firebase:any;//variable global de firebase
  constructor(
    public usuariosService:UsuariosService,
    public datostokenservice: DatosTokenService, 
    public productosService: ProductosService,
    public ofertasService: OfertasService,
    public af: AngularFire, 
    @Inject(FirebaseApp) firebase: any) 
    {
      this.idTienda=this.datostokenservice.token["id_tienda"];
      for (let i = 16; i < 100; i++) { //para rellenar los arrays de checkbox de edades
        let newName = {id:i.toString(),};
        this.edad_min.push(newName);
        this.edad_max.push(newName);
      }
      this.firebase = firebase; //metodo para pasar el firebase del constructor a todos los metodos
   }

  public showChildModal():void { 
    this.childModal.show(); //mostrar modal
    this.getProductos();
      this.staticTabs.tabs[1].disabled=true;
      this.staticTabs.tabs[2].disabled=true;
  } 

  loadingAddOferta=false;
  public addOferta(){
    this.loadingAddOferta=true;
    console.log("ADD OFERTA");
    console.log(this.IdUsuarios);
    console.log(this.idProducto);
    console.log(this.oferta);
    this.uploadImage();
  }

  @Output() uploaded:EventEmitter<string> = new EventEmitter();

  public postOferta(){ //se llama desde uploadImage una vez se ha subido la foto correctamente
      this.ofertasService.uploadOferta(this.IdUsuarios,this.idProducto,this.oferta,this.idTienda).subscribe(
        res =>{
          console.log(res);
          this.loadingAddOferta=false;
          this.uploaded.emit(); //llamamos a ofertas component para que actualice la lista
          this.hideChildModal();
        },
        err=>{ //Error de conexion con el servidor
          console.log(err);
        },
    );
  }

  public pruebaActualizar(){
    console.log("Entra a prueba actualizar");
    this.uploaded.emit();
  }

  public getProductos(){
    this.productosService.getProductos(this.idTienda,1,'',null).subscribe(
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


  selectProducto(event,idProducto){
    
     console.log("entra");
     if(event.target.checked==true){ //si pulsamos a checkear
       this.idProducto=idProducto;
     }
     else{
       this.idProducto=null;
     }
     console.log(this.idProducto);
     this.deseleccionarProductos(event,idProducto);
     this.checkValidTabs();
   }


   @ViewChildren('checkboxProducto') checkboxProductos;

    deseleccionarProductos(event,idProducto){
      console.log("Entra en deseleccionar productos");
      console.log("Event es ");
      console.log(event);
      console.log("Idproducto es "+idProducto);
      for(let checkboxproductos of this.checkboxProductos._results){
        console.log("Valor es:" +checkboxproductos.nativeElement.value);
          if(checkboxproductos.nativeElement.value!=this.idProducto){
            checkboxproductos.nativeElement.checked=false;
          }
      }    
   }




  
   selectUser(event,idUsu){
     
     console.log("entra");
     if(event.target.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdUsuarios.push(idUsu);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdUsuarios.indexOf(idUsu, 0);
        if (index > -1) {
          this.IdUsuarios.splice(index, 1);
        }
     }
     console.log(this.IdUsuarios);
     this.checkValidTabs();
   }

   selectUserBucle(event,idUsu){
      //console.log("entra2");
     if(event.nativeElement.checked==true){ //si pulsamos a checkear añadimos al array el id del usutienda
        this.IdUsuarios.push(idUsu);
        
     }
     else{ //si descheckeamos lo eliminamos
        var index = this.IdUsuarios.indexOf(idUsu, 0);
        if (index > -1) {
          this.IdUsuarios.splice(index, 1);
        }
     }
    // console.log(this.IdUsuarios);
   }

    selectAllUsers(event){
      this.IdUsuarios = [];
      for(let checkboxusers of this.checkboxUsers._results){

        if(event.target.checked==true){
         checkboxusers.nativeElement.checked=true;
         let idUsu= +checkboxusers.nativeElement.value
         this.selectUserBucle(checkboxusers,idUsu);
        
        }
        else{
          checkboxusers.nativeElement.checked=false;
          this.IdUsuarios=[];
        }
      //console.log(checkboxusers);
    }
    console.log(this.IdUsuarios);
    this.checkValidTabs();
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
  
  //Boton buscar del formulario
  public onLogin(){ 
    this.loadingUsers=true;
    (this.edadminima!='') ? this.filtro["fecha_max"]=this.buildDates(this.edadminima) :this.filtro["fecha_max"]='' ;
    (this.edadmaxima!='') ? this.filtro["fecha_min"]=this.buildDates(this.edadmaxima) :this.filtro["fecha_min"]='' ;

    this.usuariosService.getUsersOfertaModal(this.filtro,this.idTienda).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.usuarios=res[0].data;
                //console.log("usuarios es");
                //console.log(this.usuarios);
 
                
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);

              }
            }
            this.loadingUsers=false;    
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
              this.loadingUsers=false;     
          },   
    );
  }

    buscandoProducto= false;
    buscadorProductos:string='';
    busquedaActiva=false;
    public buscarProductos(){
    if(this.buscadorProductos!=''){
      this.buscandoProducto=true;
      console.log(this.buscadorProductos);
      this.productosService.getProductos(this.idTienda,1,this.buscadorProductos,null).subscribe(
          res =>{
            console.log(res);  
            if(res[0]){
              if (res[0].status==200){ //todo bien 
                this.productos=res[0].data.Productos;
                console.log(this.productos);
                this.busquedaActiva=true;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
      
              }
            }
            this.buscandoProducto=false;        
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
              this.buscandoProducto=false;   
          },   
      );
    }
  }

  eliminarBusqueda(){
    this.busquedaActiva=false;
    this.buscadorProductos="";
    this.getProductos();
  }


  public hideChildModal():void {
    this.childModal.hide();
    this.usuarios=null;
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
    var newthis=this;
    if(files){
      var date=moment().format();
      this.path="images/Oferta/"+ "Oferta_"+this.idTienda+"_"+this.idProducto+"_"+date+"_"+files.name;
      console.log(this.path);
      var storageref= this.firebase.storage().ref().child(this.path);
      var image;
      let uploadTask=storageref.put(files);
      let newthis=this;
      uploadTask.on('state_changed', function(snapshot){}, 
      function(error) {
        console.log("Error subiendo la foto");
        this.loading3=false;
        this.error3=true;
        this.msgImage="Error subiendo la foto al servidor (850386)";
        
  
      }, function() {
        console.log("Foto subida correctamente");
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
        newthis.oferta["Imagen"]=downloadURL;
        console.log(newthis.oferta);
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
     this.imageSrc=this.oferta["Imagen"];
     this.imageloaded=false;
    }

  }

  cancelImageLoad(){
    this.imageSrc=this.oferta["Imagen"];
    this.el.nativeElement.value=null;
    this.imageloaded=false;
  }

  
  checkValidTabs(){
    if(this.IdUsuarios.length!=0 && this.IdUsuarios[0]!=null){
      this.staticTabs.tabs[1].disabled=false;
       if(this.idProducto!=null){
        this.staticTabs.tabs[2].disabled=false;
      }
      else{
        this.staticTabs.tabs[2].disabled=true;
      }
    
    }
    else{
      this.staticTabs.tabs[1].disabled=true;
      this.staticTabs.tabs[2].disabled=true;
    }
     
  }

  selectTab(tab_id: number){
    console.log(this.IdUsuarios);
    console.log(this.idProducto);
    console.log(this.IdUsuarios[0]);
    this.checkValidTabs();
   

     this.staticTabs.tabs[tab_id].active = true;
  }




}
