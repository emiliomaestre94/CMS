import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'sexo' })

export class SexoPipe implements PipeTransform {

  constructor() {}

  transform(Sexo) {
    let formatted="";
    if (Sexo=="h")
      formatted="Hombre"
    else if (Sexo=="m")
      formatted="Mujer"
    return formatted;
  }

} 