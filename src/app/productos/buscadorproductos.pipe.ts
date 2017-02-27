import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'search'})
export class BuscadorProductosPipe implements PipeTransform
{
    transform(value: any, field: string,field2:string, search: string) //el primer parametro son los post sobre los que tenemos que buscar, el segundo es el campo sobre el que queremos buscar, search es el valor que introducimos en este momento
    {
        if(search == "") {
            return value;
        }

        return value.filter((res) => {
            return res[field].includes(search) || res[field2].includes(search);
        })
    }
} 