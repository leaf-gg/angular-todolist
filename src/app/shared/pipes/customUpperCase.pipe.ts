import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'CustomUpperCase',
  standalone: true,
})
export class CustomUpperCasePipe implements PipeTransform {
  transform(value: string | undefined) {
    if (value && value.length > 0) {
      return value.trim().toUpperCase();
    } else return '';
  }
}
