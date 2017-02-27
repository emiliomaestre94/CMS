import { AuthService } from './../services/auth.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';


@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent {

  //creamos un objeto user que va a representar un usuario
  //tambien podria crear una clase que represente al usuario
  user: Object = {
    username: '',
    password: ''
  };

  // ya tenemos el authservice y el router inyectados en nuestra clase
  constructor(public authService: AuthService, public router: Router) { }

   onLogin()
    {

      this.authService.login(this.user).subscribe(
          x =>{
              console.log(x),
              this.router.navigate(['/']); //nos envia a profile
          }, 
          err => {
              console.log(err);
              //this.alertMessage = err.json().reason; 
          }
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
  