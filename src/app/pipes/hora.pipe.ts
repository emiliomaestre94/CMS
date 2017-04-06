import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'hora' })

export class HoraPipe implements PipeTransform {

  constructor() {}

  transform(Fecha) {
    let formatted=Fecha.split("T")[1];
    let hour=formatted.split(":")[0];
    let minute=formatted.split(":")[1];

    return hour+":"+minute;
  }

} 