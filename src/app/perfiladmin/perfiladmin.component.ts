import { PerfiladminService } from './../services/perfiladmin.service';
import { DatosTokenService } from './../services/datostoken.service';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFire, FirebaseApp } from 'angularfire2';
import {ElementRef, ViewChild} from '@angular/core';


/*import {FileUploaderComponent} from './file-uploader.component';*/

@Component({
  selector: 'app-perfiladmin',
  templateUrl: './perfiladmin.component.html',
  styleUrls: ['./perfiladmin.component.scss']
})



export class PerfiladminComponent implements OnInit {

  //datos del admin
  public foto: string;
  public nombre: string;
  public email: string;

  public idAdmin:string; //id que recibimos del token
  public usuario; //objeto que contiene los datos del admin
  public sexo; //hasta que resuelva como hacer el ngmodel de un select

  public loading=false; //en proceso de llamada al servicor
  public error=false; //si el mensaje es de error o no
  public msg: string; //mensaje de correcto o error en la llamada al servicor (primer formulario)

  public password: string; //pass del formulario
  public newPassword: string; //new pass del formulario
  public repeatPassword: string; //repeat pass del formulario
  public validacioncorrecta:boolean=true; //pasa validacion de repetir contrasñeña
  public msgPassword: string; //mensaje de error si no coinciden las contraseñas
  public msgPassword2: string; //mensaje 2 de error si no coinciden las contraseñas
  public loading2=false; //en proceso de llamada al servicor
  public error2=false; //si el mensaje es de error o no

  public imageSrc; //src de la imagen de perfil
  public loading3=false; //en proceso de llamada al servidor(imagen)
  public error3=false; //si el mensaje es de error o no(imagen)
  public msgImage: string; //mensaje de correcto o error en la llamada al servicor (imagen)

  firebase:any;//variable global de firebase

  constructor(
    public perfilAdminService:PerfiladminService, 
    public token: DatosTokenService,
    public af: AngularFire, 
    @Inject(FirebaseApp) firebase: any
  ){
    this.firebase = firebase; //metodo para pasar el firebase del constructor a todos los metodos
   }

   
 

  setSexo(){
    if(this.usuario["Sexo_usuario"]=="m"){ this.usuario["Sexo_usuario"]=2 }
    else if(this.usuario["Sexo_usuario"]=="h"){ this.usuario["Sexo_usuario"]=1 }
    else {this.usuario["Sexo_usuario"]=0 }
  }
  setSexoAlternative(){
    if(this.usuario["Sexo_usuario"]==2){ this.sexo="m" }
    else if(this.usuario["Sexo_usuario"]==1){ this.sexo="h" }
    else {this.sexo="" }
  }

 ngOnInit(): void {
  this.idAdmin=this.token.token['id_usuario'];
  

  console.log("El id es "+this.idAdmin);

  this.perfilAdminService.getUser(this.idAdmin).subscribe(
        usuario =>{
          this.usuario=usuario[0].data[0];
          this.formatDate();
          this.imageSrc=this.usuario["Foto_usuario"];
          console.log("USUARIO ES");
          console.log(this.usuario);
          this.setSexo();

        },
        err => {
          console.log(err);
        }
    );
  }

  public formatDate(){
    this.usuario.Fecha_nac_usuario= this.usuario.Fecha_nac_usuario.split("T")[0];
  }

    updateTokenServidor(){
      
      this.token.updateTokenServidor(this.usuario).subscribe(
        res =>{
            console.log(res);
        if(res[0]){
            if (res[0].status==200){ //todo bien
                console.log("token servidor actualizado correctamente");
                this.loading=false;
            }
        }
        else{
            if(res.status==401){
                console.log("token servidor denegado");
                this.loading=false;
            }
        }        
            //this.accesocorrecto=true;        
        },
        err=>{ //Error de conexion con el servidor
          console.log("token servidor error");
            console.log(err);
            this.loading=false;
        },
    );
    }



  onLogin(){
    this.loading=true;
    this.error=false;
    this.setSexoAlternative();
    console.log("onLogin");
    console.log(this.usuario);
        this.perfilAdminService.updateUser(this.usuario,this.sexo,null).subscribe(
        res =>{
          console.log(res);
            if(res[0].status==200){
              console.log("actualizado correctamente");
              this.token.updateTokenPerfilAdmin(this.usuario);
              this.updateTokenServidor();
              this.msg="Los datos se han actualizado correctamente";
            }

        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
            this.error=true;
            this.msg="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
             this.loading=false;
        },
    );
  }

  
  validarDatos(){
    if(this.newPassword.length<8){
        this.msgPassword="Contraseña inválida (mínimo 8 caracteres). ";
        this.validacioncorrecta=false;
    }
    else{
        this.msgPassword="";
    }
    if(this.newPassword!=this.repeatPassword){
        this.msgPassword2="Las contraseñas no coinciden. ";
        this.validacioncorrecta=false;
    }
    else{
        this.msgPassword2="";
    }
    if(this.newPassword.length>=8 && (this.newPassword==this.repeatPassword)){
        this.validacioncorrecta=true;
    }

  }

  updatePassword(){
      this.perfilAdminService.updatePassword(this.newPassword,this.idAdmin).subscribe(
          res =>{
            console.log(res);
              if(res[0].status==200){ //contraseña correcta
                console.log("Contraseña cambiada correctamente");
              }
              this.msgPassword="La contraseña se ha actualizado correctamente";
              this.error2=false;
              this.loading2=false;
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
              this.msgPassword="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
              this.loading2=false;
              this.error2=true;
          },
      );
  }

  onLoginPassword(){
    this.validarDatos();
    console.log(this.password);
    console.log(this.newPassword);
    console.log(this.repeatPassword);

    if(this.validacioncorrecta==true){
      this.loading2=true;
      this.perfilAdminService.checkPassword(this.password,this.idAdmin).subscribe(
          res =>{
            console.log(res);
              if(res[0].status==200){ //contraseña correcta
                console.log("Contraseña actual correcta");
                this.updatePassword();
              }
              else if (res[0].status==204){
                console.log("Contraseña actual incorrecta");
                this.msgPassword="La contraseña actual introducida no es correcta";
                this.loading2=false;
                this.error2=true;
              }
              
          },
          err=>{ //Error de conexion con el servidor
              console.log(err);
              this.msgPassword="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
              this.loading2=false;
              this.error2=true;
          },
      );
    }
    else{
       this.error2=true;
    }
  }



   updateUserImage(URL){
      this.perfilAdminService.updateUser(this.usuario,null,URL).subscribe(
        res =>{
          console.log(res);
            if(res[0].status==200){
               this.error3=false;
              console.log("actualizado correctamente");
              this.usuario["Foto_usuario"]=URL;
              this.imageSrc=URL;
              this.token.updateTokenPerfilAdmin(this.usuario);
              this.updateTokenServidor();
              this.msgImage="La imagen se han cambiado correctamente";
              this.loading3=false;
            }

        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
             this.error3=true;
            this.msgImage="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
            this.loading3=false;
        },
    );
 
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
     this.imageSrc=this.usuario["Foto_usuario"];
     this.imageloaded=false;
    }

  }

  cancelImageLoad(){
    this.imageSrc=this.usuario["Foto_usuario"];
    this.el.nativeElement.value=null;
    this.imageloaded=false;
  }

} 
 