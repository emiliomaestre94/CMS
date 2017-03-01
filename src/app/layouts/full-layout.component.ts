import { AuthService } from './../services/auth.service';
//import { LoginService } from './../services/login.service';
import { Component, OnInit } from '@angular/core';

@Component({ 
  selector: 'app-dashboard',
  templateUrl: './full-layout.component.html'
})
export class FullLayoutComponent implements OnInit {

  //datos del admin
  public foto: string;
  public nombre: string;
  //cerrandosesion: boolean=false;
  constructor(private authService:AuthService) { }

  public disabled:boolean = false;
  public status:{isopen:boolean} = {isopen: false};

  public toggled(open:boolean):void {
    console.log('Dropdown is now: ', open);
  }

  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  ngOnInit(): void {
      this.authService.getToken().subscribe(
          usuario =>{
          console.log(usuario);
          this.foto=usuario.data.Foto;
          this.nombre=usuario.data.Nombre
          },
          err => {
              console.log(err);
          }
      );
  }

  logout(){
    this.authService.logout();
    /*
    console.log("Cerrando sesión");
    this.cerrandosesion=true;
    setTimeout(() => {
         this.authService.logout();
         this.cerrandosesion=false;
    }, 3000);
    */
  }
}
 