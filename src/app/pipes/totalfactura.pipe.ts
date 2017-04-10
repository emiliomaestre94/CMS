import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'totalFactura' })

export class TotalFacturaPipe implements PipeTransform {

  constructor() {}

  transform(cantidad, precio) {
    return cantidad*precio;
  }

} 