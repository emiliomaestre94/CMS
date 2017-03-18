import { Component, OnInit } from '@angular/core';

import { AuthService } from './../services/auth.service';

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


  constructor(private authService:AuthService) { }



 ngOnInit(): void {
      this.authService.getToken().subscribe(
          usuario =>{
          console.log(usuario);
          this.foto=usuario.data.Foto_usuario;
          this.nombre=usuario.data.Nombre_usuario;
          this.email=usuario.data.Email_usuario;

          },
          err => {
              console.log(err);
          }
      );
  }




imageSrc;
  handleInputChange(foto) {
    var files = foto.target.files;
    if (files[0]) {
      let reader = new FileReader();
      reader.onload = (e : any) => {
        this.imageSrc = e.target.result;
    }
    reader.readAsDataURL(foto.target.files[0]);

    }
  }
  

}
