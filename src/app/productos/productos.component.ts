import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  date: DateModel;
  date2: DateModel;
  options: DatePickerOptions;
  constructor() { 
        this.options = new DatePickerOptions();

  }
  
  ngOnInit() {
  }

}
