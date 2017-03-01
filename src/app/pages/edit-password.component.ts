import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  templateUrl: 'edit-password.component.html'
})
export class EditPasswordComponent implements OnInit{

    password: Object ={
        contra:'',
        confirmacion:''
    };

    mensajealerta:string; //mensaje de min 8 caracteres
    mensajealerta2:string; //mensaje de contras no coinciden
    validacioncorrecta:boolean=true; //pasa validacion de js

    alertenvio:string; //mensaje de advertencia si falla el put
    enviando:boolean=false; //cuando se está realizando el proceso de enviar datos 
    accesocorrecto:boolean=true;
    token:string //token que cojo de url 

  // ya tenemos el authservice y el router inyectados en nuestra clase
  constructor(public authService: AuthService, public router: Router,public activatedRoute: ActivatedRoute) { }

  ngOnInit(){
  }

  validarDatos(){
    if(this.password["contra"].length<8){
        this.mensajealerta="Contraseña inválida (mínimo 8 caracteres). ";
        this.validacioncorrecta=false;
    }
    else{
        this.mensajealerta="";
    }
    if(this.password["contra"]!=this.password["confirmacion"]){
        this.mensajealerta2="Las contraseñas no coinciden. ";
        this.validacioncorrecta=false;
    }
    else{
        this.mensajealerta2="";
    }
    if(this.password["contra"].length>=8 && (this.password["contra"]==this.password["confirmacion"])){
        this.validacioncorrecta=true;
    }

  }

  savePassword(){
    this.activatedRoute.queryParams.subscribe((params: Params) => {
        this.accesocorrecto=true;
        this.validarDatos();
        console.log("La validacion es "+this.validacioncorrecta);
        this.token = params['token'];
        console.log(this.token);
        this.authService.tokenUrl(this.token); //guardamos el token en localstorage
            if(this.validacioncorrecta==true){
                this.enviando=true;    
                this.authService.cambiarpassword(this.password["contra"],this.token).subscribe(
                    res =>{
                        console.log(res);
                    if(res[0]){
                        if (res[0].status==200){ //todo bien
                            console.log("TODO GUAY");
                            this.accesocorrecto=true;
                            this.authService.mensajeEditPassword=true;
                            this.router.navigate(['/login']);
                        }
                    }
                    else{
                        if(res.status==401){
                            this.alertenvio="Token incorrecto o caducado. La validez del token es de 24 horas desde el envío del email"
                            this.accesocorrecto=false;
                            console.log(this.alertenvio);
                        }
                    }        
                        //this.accesocorrecto=true;
                        this.enviando=false;
                        localStorage.removeItem("id_token");
                    },
                    err=>{ //Error de conexion con el servidor
                        this.alertenvio="Parece que hay un error en el servidor. Vuelve a intentarlo en unos minutos";
                        console.log(this.alertenvio);
                        this.enviando=false;
                        this.accesocorrecto=false;
                        localStorage.removeItem("id_token");
                    },
                );
            }

      });


  }

  
}


   