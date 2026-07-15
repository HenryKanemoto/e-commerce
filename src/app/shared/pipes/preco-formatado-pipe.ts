import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'precoFormatado',
  standalone: true
})
export class PrecoFormatadoPipe implements PipeTransform {
  transform(value: number): string {
    const valorFixado = value.toFixed(2);
    const precoFormatado = `${valorFixado} lulinhas`;
    return precoFormatado;
  }
}
