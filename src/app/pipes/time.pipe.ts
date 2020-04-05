import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(seconds: number, ...args: any[]): any {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

}
