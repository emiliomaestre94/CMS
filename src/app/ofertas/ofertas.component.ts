import { Oferta, OfertasService } from './../services/ofertas.service';
import { ModalDetalleOfertasComponent } from './modal-detalle-ofertas.component';
import { ModalOfertasComponent } from './modal-ofertas.component';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DatosTokenService } from './../services/datostoken.service';

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.scss']
})
export class OfertasComponent implements OnInit {

  ofertas: Oferta[];
  idTienda: string;

  public maxSize:number = 5; //numero maximo de paginas que queremos que se vean en el frontend
  public bigTotalItems:number = 100; //Numero total factura (falta por hacerlo en el servidor)
  public itemsPorPagina:number = 10; //items por pagina
  public bigCurrentPage:number = 1; //pagina que se selecciona por defecto
  public numPages:number = this.bigTotalItems/this.itemsPorPagina; //numero de paginas en total
  
  constructor(public ofertasService: OfertasService,public datostokenservice: DatosTokenService, ) { }

  ngOnInit() {
    this.idTienda=this.datostokenservice.token["id_tienda"];
        this.ofertasService.getOfertas(this.bigCurrentPage,'',this.idTienda).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien
              this.ofertas=res[0].data;
          
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

      this.ofertasService.getOfertasDetail('6',this.idTienda).subscribe(
        res =>{
          console.log(res);   
          if(res[0]){
            if (res[0].status==200){ //todo bien
              //this.ofertas=res[0].data;
          
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

  @ViewChild(ModalOfertasComponent) public modalOfertas:ModalOfertasComponent; //cogemos el componente para poder enviarle los datos
  @ViewChild(ModalDetalleOfertasComponent) public modalClientesOfertados:ModalOfertasComponent; //cogemos el componente para poder enviarle los datos

  showChildModal(){
    this.modalOfertas.showChildModal();
  }

  showChildModalClientesOfertados(){
    this.modalClientesOfertados.showChildModal();
  }

  

}
  