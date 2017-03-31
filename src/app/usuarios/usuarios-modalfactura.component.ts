import { Factura, FacturasService } from './../services/facturas.service';
import { Component, Input,ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';



@Component({
  selector: 'modal-perfil-factura',
  templateUrl: './usuarios-modalfactura.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosModalFacturaComponent {
    

 constructor(public facturasService:FacturasService) { }

 @ViewChild('modalFactura') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide
  
  public showChildModal():void {
    this.childModal.show(); //mostrar modal
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

} 