import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'fecha' })

export class FechaPipe implements PipeTransform {

  constructor() {}

  transform(Fecha) {
    let formatted=Fecha.split("T")[0];
    return formatted;
  }

} 