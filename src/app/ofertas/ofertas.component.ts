import { ModalDetalleOfertasComponent } from './modal-detalle-ofertas.component';
import { ModalOfertasComponent } from './modal-ofertas.component';
import { Component, OnInit,ViewChild } from '@angular/core';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @ViewChild(ModalOfertasComponent) public modalOfertas:ModalOfertasComponent; //cogemos el componente para poder enviarle los datos
  @ViewChild(ModalDetalleOfertasComponent) public modalClientesOfertados:ModalOfertasComponent; //cogemos el componente para poder enviarle los datos

  showChildModal(){
    this.modalOfertas.showChildModal();
  }

  showChildModalClientesOfertados(){
    this.modalClientesOfertados.showChildModal();
  }

  

}
 