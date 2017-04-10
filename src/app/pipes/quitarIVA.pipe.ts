import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'quitarIVA' })

export class QuitarIVAPipe implements PipeTransform {

  constructor() {}

  transform(precio) {
    let preciodescuento= +precio*(21/100)
    let preciofinal=precio-preciodescuento
    return preciofinal;
  }

}  