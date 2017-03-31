import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';

@Component({
  selector: 'modal-detalle-oferta',
  templateUrl: './modal-detalle-ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class ModalDetalleOfertasComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
 @ViewChild('clientesOfertadosModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide
   
  public showChildModal():void {
    this.childModal.show(); //mostrar modal
  }

  public hideChildModal():void {
    console.log("hidechildmodal");
    this.childModal.hide();
  }

}
