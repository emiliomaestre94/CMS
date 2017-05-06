import { ModalDetalleOfertasComponent } from './../ofertas/modal-detalle-ofertas.component';
import { ModalDetalleFacturasComponent } from './../facturas/modal-detalle-facturas.component';
import { OfertasService } from './../services/ofertas.service';
import { Factura, FacturasService } from './../services/facturas.service';
import { Component, Input,ViewChild} from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap/modal';


@Component({
  selector: 'modal-perfil',
  templateUrl: './usuarios-modalperfil.component.html',
  styleUrls: ['./usuarios.component.scss']
})

export class UsuariosModalPerfilComponent {
   
    usuario: Object={  //datos que recibimos del componente padre
        Id_usuario: '',
        Nombre_usuario: '',
        Sexo_usuario:  '',
        Email_usuario:  '',
        Telefono_usuario:  '',
        CP_usuario: '',
        Localidad_usuario:  '',
        Foto_usuario:  ''
    };

    idTienda; //id de la tienda que enviamos al servidor (recogemos de datos token service desde el padre)

    loadingFacturas:boolean=false;
    errorFacturas:boolean=false;
    msgFacturas:string;
    msgOfertas:string;

 public facturas: Factura[];
 public ofertas;

 constructor(public facturasService:FacturasService,public ofertasService:OfertasService) { }

 @ViewChild('perfilClienteModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide

  public showChildModal(usuario,idTienda):void {
    this.childModal.show(); //mostrar modal
    this.usuario=usuario;
    this.idTienda=idTienda;
    this.facturas=null;
    this.ofertas=null;
    this.getOfertasUser();
    this.getFacturasUser(); //obtener todas las facturas de ese usuario
  } 

  public hideChildModal():void {
    this.childModal.hide();
  }



  public getFacturasUser(){
    this.facturas=null;
    this.loadingFacturas=true;
    this.msgFacturas=null;
     this.facturasService.getFacturasUser(this.usuario['Id_usuario'],this.idTienda).subscribe(
        res =>{
          console.log(res);
           console.log(res[0].status);
          //console.log(res[0].data.Facturas);
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.facturas=res[0].data.Factura;
                console.log(this.facturas);
                this.errorFacturas=false;
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.errorFacturas=true;
                this.msgFacturas=this.usuario['Nombre_usuario'] + " no ha generado aún ninguna factura";
              }
            }
              this.loadingFacturas=false;
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
            this.errorFacturas=true; 
            this.loadingFacturas=false;
            this.msgFacturas="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
        },   
    );
  }

  public getOfertasUser(){
     this.ofertas=null;
     this.msgOfertas=null;
     this.ofertasService.getOfertasUser(this.usuario['Id_usuario'],this.idTienda).subscribe(
        res =>{

            if(res[0]){
              if (res[0].status==200){ //todo bien
                //this.facturas=res[0].data.Facturas;
                this.ofertas=res[0].data;
                console.log(this.ofertas);
              }
              if (res[0].status==204){ //no encontrado
                console.log(res[0].status);
                this.msgOfertas=this.usuario['Nombre_usuario'] + " no ha recibido aún ninguna oferta";
              }
            }
    
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
             this.msgOfertas="Vaya, parece que hay un problema. Recargue la página y vuelva a intentarlo. Si el problema persiste contacte con nuestro servicio técnico.";
        },   
    );
  }


  @ViewChild(ModalDetalleFacturasComponent) public modalDetalle:ModalDetalleFacturasComponent;
  showFacturaModal(factura){
    this.modalDetalle.showChildModal(factura); //llamamos al metodo del componente hijo para que muestre la modal
    //this.modalPerfil.usuario=usuario; //asignamos los datos del usuario a la variable input del componente hijo
  }

  @ViewChild(ModalDetalleOfertasComponent) public modalClientesOfertados:ModalDetalleOfertasComponent; //cogemos el componente para poder enviarle los datos
  showOfertaModal(oferta){
    this.modalClientesOfertados.showChildModal(oferta,this.idTienda,);
  }



}  