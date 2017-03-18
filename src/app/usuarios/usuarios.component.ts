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

  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total 
   
  constructor(public usuariosService: UsuariosService) { }

    public setPage(pageNo: number): void {
    this.bigCurrentPage = pageNo;
  }
 
 //Aqui llamaremos al constructor
  public pageChanged(event: any): void {
    console.log('Pagina cambiada a: ' + event.page);
    console.log('Items por pagina: ' + event.itemsPerPage);
  }

  ngOnInit() {
    console.log("Entra en el ngOnInit");
    
    this.usuariosService.getUsers().subscribe(
      users => {
        this.usuarios=users;
      }
    );
  }
}
  