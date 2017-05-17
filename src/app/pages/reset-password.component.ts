import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  templateUrl: 'reset-password.component.html'
})
export class ResetPasswordComponent {

    correo: Object = {
        email: '' 
    };
    
    mensajealerta:string;
    enviando: boolean=false;
    enviocorrecto: boolean=false;
 
  // ya tenemos el authservice y el router inyectados en nuestra clase
  constructor(public authService: AuthService, public router: Router) { }

  enviarCorreo(){
      this.enviando=true;
      console.log(this.correo["email"]);
      this.authService.resetpassword(this.correo["email"]).subscribe(
          res =>{
            if (res[0].status==200){ //todo bien
                console.log("TODO GUAY");
                this.enviocorrecto=true;
            }
            else{ //datos no encontrados
                this.mensajealerta=res[0].json;
                console.log(this.mensajealerta);
            }
            this.enviando=false;
          },
          err=>{ //Error de conexion con el servidor  
            this.mensajealerta="Parece que hay un error en el servidor. Vuelve a intentarlo en unos minutos";
            console.log(this.mensajealerta);
            this.enviando=false;
          },
      );
  }
  loguear(){
       this.router.navigate(['/login']);
       
  }
 

  
}


   