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

  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total

  constructor(public facturasService: FacturasService) { }
 
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
    /*
    this.facturasService.getFacturasPaginada(1).subscribe(
      facts => {
        this.facturas=facts;
      }
    );
    */
    
  }

  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

}