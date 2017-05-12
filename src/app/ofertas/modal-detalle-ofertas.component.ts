import { OfertasService } from './../services/ofertas.service';
import { Component, ViewChild,Inject,ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Usuario } from './../services/usuarios.service';
import { AngularFire, FirebaseApp } from 'angularfire2';
import * as moment from 'moment';

@Component({
  selector: 'modal-detalle-oferta',
  templateUrl: './modal-detalle-ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class ModalDetalleOfertasComponent  {

  public usuarios:Usuario[];

  public error: boolean=false;
  public msgAlert;
  public loadingActualizando=false;

  public idTienda;
  public oferta;
  public imageSrc;

  @ViewChild('clientesOfertadosModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide
  firebase:any;//variable global de firebase

  constructor(public ofertasService: OfertasService, @Inject(FirebaseApp) firebase: any,  public af: AngularFire) {  
    this.firebase = firebase;
  }

  saveData(){
    console.log(this.oferta);
    this.uploadImage();
  }
  updateOferta(){
    this.ofertasService.updateOferta(this.oferta,this.idTienda).subscribe(
        res =>{
          console.log(res)
          console.log(res[0]);
          //this.uploadImage();
          this.error=false;
          this.loadingActualizando=false;
          this.msgAlert="Datos actualizados correctamente";
          this.el.nativeElement.files[0]=null;
          this.imageloaded=false;
        },
        err=>{ //Error de conexion con el servidor
          console.log(err);
          this.error=true;
          this.loadingActualizando=false;
          this.msgAlert="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
        },
    );
  } 

  public formatDate(oferta){
    this.oferta.Fecha_inicio_oferta_usuario= oferta.Fecha_inicio_oferta_usuario.split("T")[0];
    this.oferta.Fecha_fin_oferta_usuario= oferta.Fecha_fin_oferta_usuario.split("T")[0];
  }
   
  public showChildModal(oferta,idTienda):void {
    this.msgAlert=null;
    this.el.nativeElement.files[0]=null;
    this.imageloaded=false;
    this.imageSrc=oferta.Foto_oferta_usuario;
    this.oferta=oferta; //le en
    this.formatDate(oferta);
    this.idTienda=idTienda;
    console.log(this.idTienda);
    console.log(oferta);
    this.childModal.show(); //mostrar modal
    this.usuarios=null;
    this.getOfertasUser();
  }
  getOfertasUser(){
      this.ofertasService.getOfertasDetail(this.oferta.Id_oferta_usuario,this.idTienda).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien 
              //this.ofertas=res[0].data;
              console.log("getofertasdetail");
              console.log(res[0]); 
              this.usuarios=res[0].data;
            }
            if (res[0].status==204){ //no encontrado
              console.log(res[0].status);
  
            }
          }
           //this.accesocorrecto=true;        
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
        },   
    );
  }

  public hideChildModal():void {
    console.log("hidechildmodal");
    this.childModal.hide();
  }

  @ViewChild('image') el:ElementRef; //cogemos el input del dom
  storageref;
  storage;
  path;

  uploadImage(){
    this.loadingActualizando=true;
    var files = this.el.nativeElement.files[0];
    console.log("FIIIIIIIIIIIIIIIIIIIIIIILES");
    console.log(files);;
    if(files && this.imageloaded==true){
      var date=moment().format();
      this.path="images/Oferta/"+ "Oferta_"+this.idTienda+"_"+"_"+date+"_"+files.name;
      console.log(this.path);
      var storageref= this.firebase.storage().ref().child(this.path);
      //console.log(storageref);
      var image;
      //storageref.getDownloadURL().then(url => image = url);
    // console.log("La URL es "+image);
      let uploadTask=storageref.put(files);
      var newthis=this;
      uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
      }, function(error) {
        console.log("Error subiendo la foto");
          newthis.error=true;
          newthis.loadingActualizando=false;
          newthis.msgAlert="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
      }, function() {
          console.log("Foto subida correctamente");
          var downloadURL = uploadTask.snapshot.downloadURL;
          newthis.oferta["Foto_oferta_usuario"]=downloadURL;
          console.log(downloadURL);
          newthis.updateOferta();
      });
    }
    else{
       this.updateOferta();
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
     this.imageSrc=this.oferta["Foto_oferta_usuario"];
     this.imageloaded=false;
    }

  }

  cancelImageLoad(){
    this.imageSrc=this.oferta["Foto_oferta_usuario"];
    this.el.nativeElement.value=null;
    this.imageloaded=false;
  }

}
