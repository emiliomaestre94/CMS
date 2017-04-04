import { OfertasService } from './../services/ofertas.service';
import { Component, ViewChild,Inject,ElementRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { Usuario } from './../services/usuarios.service';
import { AngularFire, FirebaseApp } from 'angularfire2';

@Component({
  selector: 'modal-detalle-oferta',
  templateUrl: './modal-detalle-ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class ModalDetalleOfertasComponent  {

  public usuarios:Usuario[]; 
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
    this.updateOferta();
  }
  updateOferta(){
    this.ofertasService.updateOferta(this.oferta,this.idTienda).subscribe(
        res =>{
          console.log(res)
          console.log(res[0]);
        },
        err=>{ //Error de conexion con el servidor
          console.log(err);
        },
    );
  } 

  public formatDate(oferta){
    this.oferta.Fecha_inicio_oferta_usuario= oferta.Fecha_inicio_oferta_usuario.split("T")[0];
    this.oferta.Fecha_fin_oferta_usuario= oferta.Fecha_fin_oferta_usuario.split("T")[0];
  }
   
  public showChildModal(oferta,idTienda):void {
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
/*
  uploadImage(){
    console.log(this.el);
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.files[0]);
    var files = this.el.nativeElement.files[0];
   
    if(files){
      this.loading3=true;
      this.path="images/Perfil/"+ "Perfil_"+this.idAdmin+"_"+files.name;
      console.log(this.path);
      var storageref= this.firebase.storage().ref().child(this.path);
      //console.log(storageref);
      var image;
      //storageref.getDownloadURL().then(url => image = url);
    // console.log("La URL es "+image);
      let uploadTask=storageref.put(files);

      let newthis=this;
      uploadTask.on('state_changed', function(snapshot){
      // Observe state change events such as progress, pause, and resume
      // See below for more detail
      }, function(error) {
      console.log("Error subiendo la foto");
      this.loading3=false;
      this.error3=true;
      this.msgImage="Error subiendo la foto al servidor (850386)";
        // Handle unsuccessful uploads
      }, function() {
      // Handle successful uploads on complete
      // For instance, get the download URL: https://firebasestorage.googleapis.com/...
      console.log("Foto subida correctamente");
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
        newthis.updateUserImage(downloadURL);
      });
    }

  }
*/
 


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
