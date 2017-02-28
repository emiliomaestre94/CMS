import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  //creamos un objeto user que va a representar un usuario
  //tambien podria crear una clase que represente al usuario
  user: Object = {
    username: '',
    password: ''
  };
  mensajeEditPassword:boolean=false; //mensaje de confirmacion de contraseña cambiada correctamente
  enviando: boolean=false;
  alertenvio: string;
  accesocorrecto:boolean=true;
  // ya tenemos el authservice y el router inyectados en nuestra clase
  constructor(public authService: AuthService, public router: Router) { }

  //comprobamos si recibe el parametro de editpassword para mostrar mensaje de confirmacion
  ngOnInit(){
      this.mensajeEditPassword=this.authService.mensajeEditPassword;
  }
  ngOnDestroy(){
      console.log("Ondestroy");
      this.authService.mensajeEditPassword=false;
  }

   onLogin()
   {
    this.enviando=true;
    this.accesocorrecto=true; 
    this.authService.login(this.user).subscribe(
        res =>{
            console.log(res);
        if(res[0]){
            if (res[0].status==200){ //todo bien
                    this.router.navigate(['/']); //nos envia a profile
            }
        }
        else{
            if(res.status==401){
                this.alertenvio=res.json;
                this.accesocorrecto=false;
                console.log(this.alertenvio);
                 this.enviando=false;   
            }
        }        
            //this.accesocorrecto=true;
           
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
            this.alertenvio="Parece que hay un error en el servidor. Vuelve a intentarlo en unos minutos";
            console.log(this.alertenvio);
            this.enviando=false;
            this.accesocorrecto=false;
        },
    );
  } 

  resetpassword(){
       this.router.navigate(['/resetpassword']);
       
  }
  
      /*
        //this.tryLogin = true;
        this.authService.login().subscribe(() => {
            if(this.authService.isLoggedIn) // Si el loggin es correcto
            {
               // this.tryLogin = false;//ya no está intentando hacer acceder
                this.router.navigate(['/']); //nos envia a profile
            }
        })
        */
    
 

}
  