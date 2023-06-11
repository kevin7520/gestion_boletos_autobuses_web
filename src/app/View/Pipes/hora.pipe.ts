import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hora'
})
export class HoraPipe implements PipeTransform {
  
  transform(value: string): string {
    const partesHora = value.split(':');
    const hora = partesHora[0];
    const minutos = partesHora[1];

    return hora + ':' + minutos;
  }
}
