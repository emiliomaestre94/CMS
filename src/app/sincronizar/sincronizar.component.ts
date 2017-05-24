import { Component, OnInit } from '@angular/core';
import { sinc, SincronizarService} from './../services/sincronizar.service';
import * as moment from 'moment';

@Component({
  selector: 'app-sincronizar',
  templateUrl: './sincronizar.component.html',
  styleUrls: ['./sincronizar.component.scss']
})


export class SincronizarComponent implements OnInit {
  loadingButton:boolean=false;
  constructor(public sincronizarService: SincronizarService){}

  ngOnInit(){

  }



public sincronizaciones: sinc[] = [];

  importar(){
    var today= moment().format('L');
    var res = today.split("/");
    var final= res[1]+"/"+res[0]+"/"+res[2];

    var today= moment().format();
    var res2 = today.split("T");
    var res3 = res2[1].split("+");
    var res4 = res3[0].split(":");
    var hora =res4[0]+":"+res4[1];
    console.log(hora);
    this.loadingButton=true;
    setTimeout(() => {
      this.loadingButton=false;
      this.sincronizaciones.push({
        fecha: final,
        hora: hora,
        productos: "117",
        clientes: "100",
        nuevos: "0",
        modificados: "0",
        eliminados: "0",
      });
      
      console.log(this.sincronizaciones);
    
    }, 3000);

     
  } 

  
 
}
