import { EmpresaService } from './../services/empresa.service';
import { DashboardService } from './../services/dashboard.service';
import { DatosTokenService } from './../services/datostoken.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelper} from 'angular2-jwt';


@Component({
  templateUrl: 'dashboard.component.html'

})
export class DashboardComponent implements OnInit {

  idTienda:string; //id de la tienda

  constructor(public datostokenservice: DatosTokenService, public dashboardservice: DashboardService, public empresaService: EmpresaService,) { }

  totalUsuariosTotales: string  //guarda los usuarios totales
  totalCompradoresTotales: string  //guarda los usuarios totales
  totalNuevosUsuarios: string  //guarda los usuarios totales (primera tarjeta)
  totalFacturas: string  //guarda los usuarios totales (primera tarjeta)
  loadingUsers: boolean=true;  //cargando primera tarjeta

  ngOnInit(): void {
    //generamos valores random para el chart (mas adelante los quitaremos)
    for (var i = 0; i <= this.mainChartElements; i++) {
      this.mainChartData1.push(3000,2300,4600,5365,1284,8593,7836,6735,3654,8365,1087,6835,6327,7453,4087,7361,6398,4873,7463,2847,4000,6934,3456,7485,9345,7354,8453,5736);
      this.mainChartData2.push(this.random(80,100));
      this.mainChartData3.push(65);
    }
    this.idTienda=this.datostokenservice.token['id_tienda'];
    console.log(this.idTienda);
    this.getTienda();
  }
  
  public tienda;
    getTienda(){
      this.empresaService.getTienda(this.idTienda).subscribe(
        res =>{
          console.log(res);  
          this.tienda=res[0].data.Tiendas[0];
          this.totalUsuariosTotales=this.tienda.Numero_usuarios_tienda;
          this.totalCompradoresTotales=this.tienda.Numero_usuarios_compran_tienda;
          this.totalNuevosUsuarios=this.tienda.Numero_usuarios_mes_tienda;
          this.totalFacturas=this.tienda.Numero_facturas_mes_tienda
          console.log(this.tienda);   
          this.loadingUsers=false;
        },
        err=>{ //Error de conexion con el servidor
            console.log(err);
        },   
    ); 
  } 


  //MIERDA DE ESTADISTICAS
  public brandPrimary:string =  '#20a8d8';
  public brandSuccess:string =  '#4dbd74';
  public brandInfo:string =   '#63c2de';
  public brandWarning:string =  '#f8cb00';
  public brandDanger:string =   '#f86c6b';

  // dropdown buttons
  public status: { isopen: boolean } = { isopen: false };
  public toggleDropdown($event:MouseEvent):void {
    $event.preventDefault();
    $event.stopPropagation();
    this.status.isopen = !this.status.isopen;
  }

  //convert Hex to RGBA
  public convertHex(hex:string,opacity:number){
    hex = hex.replace('#','');
    let r = parseInt(hex.substring(0,2), 16);
    let g = parseInt(hex.substring(2,4), 16);
    let b = parseInt(hex.substring(4,6), 16);

    let rgba = 'rgba('+r+','+g+','+b+','+opacity/100+')';
    return rgba;
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }

  public chartHovered(e:any):void {
    console.log(e);
  }

  // lineChart1
  public lineChart1Data:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Series A'
    }
  ];
  public lineChart1Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart1Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 40 - 5,
          max: 84 + 5,
        }
      }],
    },
    elements: {
      line: {
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart1Colours:Array<any> = [
    { // grey
      backgroundColor: this.brandPrimary,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart1Legend:boolean = false;
  public lineChart1Type:string = 'line';

  // lineChart2
  public lineChart2Data:Array<any> = [
    {
      data: [1, 18, 9, 17, 34, 22, 11],
      label: 'Series A'
    }
  ];
  public lineChart2Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart2Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'transparent',
          zeroLineColor: 'transparent'
        },
        ticks: {
          fontSize: 2,
          fontColor: 'transparent',
        }

      }],
      yAxes: [{
        display: false,
        ticks: {
          display: false,
          min: 1 - 5,
          max: 34 + 5,
        }
      }],
    },
    elements: {
      line: {
        tension: 0.00001,
        borderWidth: 1
      },
      point: {
        radius: 4,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart2Colours:Array<any> = [
    { // grey
      backgroundColor: this.brandInfo,
      borderColor: 'rgba(255,255,255,.55)'
    }
  ];
  public lineChart2Legend:boolean = false;
  public lineChart2Type:string = 'line';


  // lineChart3
  public lineChart3Data:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'Series A'
    }
  ];
  public lineChart3Labels:Array<any> = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChart3Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
      },
    },
    legend: {
      display: false
    }
  };
  public lineChart3Colours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.2)',
      borderColor: 'rgba(255,255,255,.55)',
    }
  ];
  public lineChart3Legend:boolean = false;
  public lineChart3Type:string = 'line';


  // barChart1
  public barChart1Data:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40, 78, 81, 80, 45, 34, 12, 40, 12, 40],
      label: 'Series A'
    }
  ];
  public barChart1Labels:Array<any> = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
  public barChart1Options:any = {
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display: false,
        barPercentage: 0.6,
      }],
      yAxes: [{
        display: false
      }]
    },
    legend: {
      display: false
    }
  };
  public barChart1Colours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.3)',
      borderWidth: 0
    }
  ];
  public barChart1Legend:boolean = false;
  public barChart1Type:string = 'bar';

  // mainChart

  public random(min:number, max:number) {
    return Math.floor(Math.random()*(max-min+1)+min);
  }

  public mainChartElements:number = 27;
  public mainChartData1:Array<number> = [];
  public mainChartData2:Array<number> = [];
  public mainChartData3:Array<number> = [];

  public mainChartData:Array<any> = [
    {
      data: this.mainChartData1,
      label: 'Facturado'
    }
  ];
  public mainChartLabels:Array<any> = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo', 'Lunes', 'Jueves', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  public mainChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        gridLines: {
          drawOnChartArea: false,
        },
        ticks: {
          callback: function(value:any) {
            return value.charAt(0);
          }
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5,
          stepSize: Math.ceil(10000 / 5),
          max:  10000
        }
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public mainChartColours:Array<any> = [
    { //brandInfo
      backgroundColor: this.convertHex(this.brandInfo,10),
      borderColor: this.brandInfo,
      pointHoverBackgroundColor: '#fff'
    },
    { //brandSuccess
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
      pointHoverBackgroundColor: '#fff'
    },
    { //brandDanger
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
      pointHoverBackgroundColor: '#fff',
      borderWidth: 1,
      borderDash: [8, 5]
    }
  ];
  public mainChartLegend:boolean = false;
  public mainChartType:string = 'line';

  // social box charts

  public socialChartData1:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Facebook'
    }
  ];
  public socialChartData2:Array<any> = [
    {
      data: [1, 13, 9, 17, 34, 41, 38],
      label: 'Twitter'
    }
  ];
  public socialChartData3:Array<any> = [
    {
      data: [78, 81, 80, 45, 34, 12, 40],
      label: 'LinkedIn'
    }
  ];
  public socialChartData4:Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Google+'
    }
  ];

  public socialChartLabels:Array<any> = ['January','February','March','April','May','June','July'];
  public socialChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public socialChartColours:Array<any> = [
    {
      backgroundColor: 'rgba(255,255,255,.1)',
      borderColor: 'rgba(255,255,255,.55)',
      pointHoverBackgroundColor: '#fff'
    }
  ];
  public socialChartLegend:boolean = false;
  public socialChartType:string = 'line';

  // sparkline charts

  public sparklineChartData1:Array<any> = [
    {
      data: [35, 23, 56, 22, 97, 23, 64],
      label: 'Clients'
    }
  ];
  public sparklineChartData2:Array<any> = [
    {
      data: [65, 59, 84, 84, 51, 55, 40],
      label: 'Clients'
    }
  ];

  public sparklineChartLabels:Array<any> = ['January','February','March','April','May','June','July'];
  public sparklineChartOptions:any = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [{
        display:false,
      }],
      yAxes: [{
        display:false,
      }]
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 0,
        hitRadius: 10,
        hoverRadius: 4,
        hoverBorderWidth: 3,
      }
    },
    legend: {
      display: false
    }
  };
  public sparklineChartDefault:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: '#d1d4d7',
    }
  ];
  public sparklineChartPrimary:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandPrimary,
    }
  ];
  public sparklineChartInfo:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandInfo,
    }
  ];
  public sparklineChartDanger:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandDanger,
    }
  ];
  public sparklineChartWarning:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandWarning,
    }
  ];
  public sparklineChartSuccess:Array<any> = [
    {
      backgroundColor: 'transparent',
      borderColor: this.brandSuccess,
    }
  ];


  public sparklineChartLegend:boolean = false;
  public sparklineChartType:string = 'line';

    // Pie
  public pieChartLabels:string[] = ['Android', 'iOS'];
  public pieChartData:number[] = [61, 39];
  public pieChartType:string = 'pie';

  //barChart
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true
  };


  public barChartLabels:string[] = ['Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
  public barChartType:string = 'bar';
  public barChartLegend:boolean = true;

  public barChartData:any[] = [
    {data: [65, 59, 80, 81, 56, 55, 40], label: 'Ofertas utilizados' },
    {data: [90, 104, 152, 156, 107, 100, 80], label: 'Ofertas vistas' },
  ];


  public barChartLabels2:string[] = ['Noviembre', 'Diciembre', 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'];
  public barChartType2:string = 'bar';
  public barChartLegend2:boolean = true;

  public barChartData2:any[] = [
    {data: [65, 90, 120, 130, 91, 100, 130], label: 'Productos vendidos' },
    {data: [120, 133, 180, 190, 110, 130, 160], label: 'Productos escaneados' },
  ];



    // Doughnut
  public doughnutChartLabels:string[] = ['Hombre', 'Mujer'];
  public doughnutChartData:number[] = [37,63];
  public doughnutChartType:string = 'doughnut';
  
}
