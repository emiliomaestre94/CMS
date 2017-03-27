import { UsuariosModalFacturaComponent } from './usuarios-modalfactura.component';
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

 facturas: Factura[];

 constructor(public facturasService:FacturasService) { }

 @ViewChild('perfilClienteModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide
 @ViewChild(UsuariosModalFacturaComponent) public modalFactura:UsuariosModalFacturaComponent; //cogemos el componente para poder enviarle los datos

  public showChildModal(usuario,idTienda):void {
    this.childModal.show(); //mostrar modal
    this.usuario=usuario;
    this.idTienda=idTienda;
    this.getFacturasUser(); //obtener todas las facturas de ese usuario
  } 

  public hideChildModal():void {
    this.childModal.hide();
  }

  showFacturaModal(){
    this.modalFactura.showChildModal();
  }

  public getFacturasUser(){
    this.loadingFacturas=true;
     this.facturasService.getFacturasUser(this.usuario['Id_usuario'],this.idTienda).subscribe(
        res =>{
           console.log(res[0].status);
          //console.log(res[0].data.Facturas);
            if(res[0]){
              if (res[0].status==200){ //todo bien
                this.facturas=res[0].data.Facturas;
                console.log(this.facturas);
                this.errorFacturas=false;
              }
              if (res[0].status==206){ //no encontrado
                console.log(res[0].status);
                this.errorFacturas=true;
                this.msgFacturas=this.usuario['Nombre:usuario'] + " no ha generado aún ninguna factura";
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








}