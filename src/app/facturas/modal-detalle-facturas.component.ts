import { Factura, FacturasService } from './../services/facturas.service';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { DatosTokenService } from './../services/datostoken.service';
import { ModalDirective } from 'ng2-bootstrap/modal';
declare let jsPDF;

@Component({
  selector: 'modal-detalle-facturas',
  templateUrl: './modal-detalle-facturas.component.html',
  styleUrls: ['./facturas.component.scss']
})
 

export class ModalDetalleFacturasComponent {

  @ViewChild('facturaModal') public childModal:ModalDirective; //directiva para que funcionen los metodos de show y hide 
  @ViewChild('factura') factura: ElementRef;
  public facturaDetalle;
  public facturaLineas;

  constructor(public facturasService: FacturasService, public datostokenservice: DatosTokenService, private elementRef:ElementRef) { }

  ngAfterViewInit() { //Añadimos el script de jsPDF
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js";
    this.elementRef.nativeElement.appendChild(s);

 
      var m = document.createElement("script");
    m.type = "text/javascript";
    m.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js";
    this.elementRef.nativeElement.appendChild(m);
  }

  public showChildModal(factura):void {
    this.facturaDetalle=null;
    this.facturaLineas=null;
    console.log(factura);
    this.childModal.show();
    this.getFacturaDetails(factura.Id_factura);
  }

  public getFacturaDetails(IdFactura){
    this.facturasService.getFactura(IdFactura).subscribe(
      res =>{
          console.log(res);
          this.facturaDetalle=res[0].data.Factura[0];
          this.facturaLineas=res[0].data.Lineas;
          console.log(this.facturaLineas);      
        },
      err=>{ 
          console.log(err);
      },   
    );
  } 

  public hideChildModal():void {
    this.childModal.hide();
  }

  public download() {
    /*
    var doc = new jsPDF();
    // doc.addImage('https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/2000px-Apple_logo_black.svg.png', 'PNG',0, 0, 500, 500);
    // var imgData = 'data:image/jpeg;base64,'+ Base64.encode('Koala.jpeg');

    doc.text(20, 20, 'Generador de facturas PDF!');
    doc.text(20, 30, 'Aqui van las facturas.'); 
    doc.addPage();
    doc.text(20, 20, 'Segunda pagina');
    // Save the PDF
    
    var specialElementHandlers = {
      '#editor': function(element, renderer){ return true;}
    };

    doc.save('Test.pdf');
    */
    /*
        let pdf = new jsPDF();
        let options = {
            pagesplit: true
        };
        pdf.addHTML(this.factura.nativeElement, 0, 0, options, () => {
            pdf.save("test.pdf");
        });
        */
var pdf = new jsPDF('p', 'pt', 'a4'); // basic create pdf
pdf.internal.scaleFactor = 1; // play with this value

pdf.addHTML(this.factura.nativeElement, {pagesplit: true, retina: true}, function () { // addHtml with automatic pageSplit
    var out = pdf.output('dataurlnewwindow'); // output format of your pdf -> there are a lot blob, base64....
});
  }

  

} 