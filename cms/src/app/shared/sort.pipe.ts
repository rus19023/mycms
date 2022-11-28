import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  pure: false
})

export class SortPipe implements PipeTransform {

  transform(value: any, propertyName: string): any {
    return value.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
      if (a[propertyName] > b[propertyName]) {
        return 1;
      } else {
        return -1;
      }
    });
  }

}