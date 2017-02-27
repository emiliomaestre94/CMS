import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
import { Factura, FacturasService } from './../services/facturas.service';
import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})


export class FacturasComponent implements OnInit {

  facturas: Factura[];
  buscadorFacturas: string="";
  constructor(public facturasService: FacturasService) { }
/*
  ngOnInit() {
    console.log("Entra en el ngOnInit");
    
    this.facturasService.getUsers().subscribe(
      facts => {
        this.facturas=facts;
      }
    );
  }
*/
  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }






}