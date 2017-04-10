import { PerfiladminService } from './../services/perfiladmin.service';
import { EmpresaService } from './../services/empresa.service';
import { Component, OnInit, Inject } from '@angular/core';
import { DatosTokenService } from './../services/datostoken.service';
import { AngularFire, FirebaseApp } from 'angularfire2';
import {ElementRef, ViewChild} from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent implements OnInit {
  
  public tienda;//contiene los datos de la tienda que recibimos del servidor
  public idTienda; //id de la tienda del token
  public imageSrc; //logo
  public imageSrc2; //fotofondo
  
  firebase:any;//variable global de firebase

  constructor(
    public empresaService: EmpresaService,
    public token: DatosTokenService,
    public af: AngularFire,
    public perfilAdminService: PerfiladminService,
    @Inject(FirebaseApp) firebase: any
    ){ 
      this.firebase = firebase; 
    }

  ngOnInit() {
    this.idTienda=this.token.token['id_tienda'];
    this.getTienda();
  }

  updateTienda(){
    console.log(this.tienda);
      this.empresaService.updateTienda(this.tienda,null).subscribe(
        res =>{
          console.log(res);
          this.token.updateTokenEmpresa(this.tienda);
          this.getUser();
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
        },    
    );     
  }

  getTienda(){
      this.empresaService.getTienda(this.idTienda).subscribe(
        res =>{
          console.log(res);  
          this.tienda=res[0].data.Tiendas[0];
          this.imageSrc=this.tienda["Logo_tienda"];
          this.imageSrc2=this.tienda["Foto_tienda"];  
          console.log(this.tienda);   
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
        },   
    ); 
  }



  ///////////////LOGO////////////////////
  
  @ViewChild('image') el:ElementRef; //cogemos el input del dom  
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
     this.imageSrc=this.tienda["Logo_tienda"];
     this.imageloaded=false;
    }

  }

  cancelImageLoad(){
    this.imageSrc=this.tienda["Logo_tienda"];
    this.el.nativeElement.value=null;
    this.imageloaded=false;
  }
 

  ///////////////FOTO///////////////

  @ViewChild('image2') el2:ElementRef; //cogemos el input del dom
  files2;
  imageloaded2: boolean=false//si hay una fotocargada

  handleInputChange2(foto) {  
    this.files2 = foto.target.files;
    if (this.files2[0]) {
      let reader = new FileReader();
      reader.onload = (e : any) => {
        this.imageSrc2 = e.target.result;
      }
      reader.readAsDataURL(foto.target.files[0]);
      this.imageloaded2=true;
    }
    else{
     this.imageSrc2=this.tienda["Foto_tienda"];
     this.imageloaded2=false;
    }

  }

  cancelImageLoad2(){
    this.imageSrc2=this.tienda["Foto_tienda"];
    this.el2.nativeElement.value=null;
    this.imageloaded2=false;
  }


  //////////UPLOAD IMAGES//////////
  storageref;
  storage;
  path;
  uploadImageLogo(){
    console.log(this.el);
    console.log(this.el.nativeElement);
    console.log(this.el.nativeElement.files[0]);
    var files = this.el.nativeElement.files[0];

    if(files){
      this.path="images/Tienda/Logos/"+ "Logos_"+this.token.token['id_tienda']+"_"+this.token.token['id_usuario']+moment().format()+"_"+files.name;
      console.log(this.path);
      var storageref= this.firebase.storage().ref().child(this.path);
      var image;
      let uploadTask=storageref.put(files);

      let newthis=this;
      uploadTask.on('state_changed', function(snapshot){
    
      }, function(error) {
      console.log("Error subiendo la foto de Logo");
      }, function() {
        console.log("Foto subida correctamente");
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
        newthis.tienda["Logo_tienda"]=downloadURL;///////////////////////////
        newthis.updateTiendaLogo(downloadURL);
      });
    }
  }
  uploadImageFondo(){
    console.log(this.el2);
    console.log(this.el2.nativeElement);
    console.log(this.el2.nativeElement.files[0]);
    var files = this.el2.nativeElement.files[0];

    if(files){
      this.path="images/Tienda/Fondos/"+ "Fondos_"+this.token.token['id_tienda']+"_"+this.token.token['id_usuario']+moment().format()+"_"+files.name;
      console.log(this.path);
      var storageref= this.firebase.storage().ref().child(this.path);
      var image;
      let uploadTask=storageref.put(files);

      let newthis=this;
      uploadTask.on('state_changed', function(snapshot){
    
      }, function(error) {
      console.log("Error subiendo la foto de Logo");
      }, function() {
        console.log("Foto subida correctamente");
        var downloadURL = uploadTask.snapshot.downloadURL;
        console.log(downloadURL);
        newthis.tienda["Foto_tienda"]=downloadURL;///////////////////////////
        newthis.updateTiendaFondo(downloadURL);
      });
    }
  }



  ////////////UPDATE SERVER////////////////
    updateTiendaLogo(URL){
      this.empresaService.updateTienda(this.tienda,URL).subscribe(
        res =>{
          console.log(res);
            if(res[0].status==200){
              console.log("actualizado correctamente");
             
              this.imageSrc=URL;
              this.token.updateTokenEmpresa(this.tienda);
              this.getUser();
            }

        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
        },
    );

 }


   ////////////UPDATE SERVER////////////////
  updateTiendaFondo(URL){
    this.empresaService.updateTienda(this.tienda,URL).subscribe(
      res =>{
        console.log(res);
          if(res[0].status==200){
            console.log("actualizado correctamente");          
            this.imageSrc2=URL;
            this.imageloaded2=false;
          }
      },
      err=>{ //Error de conexion con el servidor
          console.log(err);
      },
  );
 }

 public usuario;
 getUser(){
  this.perfilAdminService.getUser(this.token.token["id_usuario"]).subscribe(
        usuario =>{
          this.usuario=usuario[0].data[0];
          console.log("USUARIO ES");
          console.log(this.usuario);
          this.updateTokenServidor();
        },
        err => {
          console.log(err);
        }
    );
 }

  updateTokenServidor(){
      
      this.token.updateTokenServidor(this.usuario).subscribe(
        res =>{
            console.log(res);
        if(res[0]){
            if (res[0].status==200){ //todo bien
                console.log("token servidor actualizado correctamente");
                this.imageloaded=false;
            }
        }
        else{
            if(res.status==401){
                console.log("token servidor denegado");
            }
        }        
            //this.accesocorrecto=true;        
        },
        err=>{ //Error de conexion con el servidor
          console.log("token servidor error");
            console.log(err);
        },
    );
    }







}
