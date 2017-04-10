import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'oferta' })

export class OfertaPipe implements PipeTransform {

  constructor() {}

  transform(precio,descuento) {
    let dto=+descuento/100;
    let preciodto=+precio*dto;
    let preciofinal= +precio-preciodto;
    return preciofinal;
  }

} 