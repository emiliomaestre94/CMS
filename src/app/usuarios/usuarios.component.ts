import { Usuario, UsuariosService } from './../services/usuarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  buscadorUsuarios: string="";
  constructor(public usuariosService: UsuariosService) { }

  ngOnInit() {
    console.log("Entra en el ngOnInit");
    
    this.usuariosService.getUsers().subscribe(
      users => {
        this.usuarios=users;
      }
    );
  }
}
  