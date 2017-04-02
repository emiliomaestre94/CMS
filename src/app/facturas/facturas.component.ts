import { ModalDirective } from 'ng2-bootstrap/modal/modal.component';
import { Factura, FacturasService } from './../services/facturas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosTokenService } from './../services/datostoken.service';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
 

export class FacturasComponent implements OnInit {

  facturas: Factura[];
  buscadorFacturas: string="";
  idTienda:string;
  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total

  constructor(public facturasService: FacturasService, public datostokenservice: DatosTokenService) { }

  ngOnInit() {
    this.idTienda=this.datostokenservice.token["id_tienda"];  
    console.log("Entra en el ngOnInit");
      this.facturasService.getFacturas(this.bigCurrentPage,'',this.idTienda).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.facturas=res[0].data.Facturas;
              console.log(this.facturas);
            }
            if (res[0].status==204){ //no encontrado
              console.log(res[0].status);
            }
          }
           //this.accesocorrecto=true;        
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
        },   
    );
  }
 
  public setPage(pageNo: number): void {
    this.bigCurrentPage = pageNo; 
  }
 
 //Aqui llamaremos al constructor
  public pageChanged(event: any): void {
    console.log('Pagina cambiada a: ' + event.page);
    console.log('Items por pagina: ' + event.itemsPerPage);
  }



  @ViewChild('childModal') public childModal:ModalDirective;

  public showChildModal():void {
    this.childModal.show();
  }

  public hideChildModal():void {
    this.childModal.hide();
  }

}