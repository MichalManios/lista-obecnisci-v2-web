import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    args[0].slice().reverse().forEach( (arg: any) => {
      value = (value) ? value.sort((a: object, b: object) => {
        const unsignedArg = this.isDescending(arg) ? arg.slice(1) : arg;
        const comparisonResult = this.comparator(a, b, unsignedArg);

        return this.isDescending(arg) ? comparisonResult * -1 : comparisonResult;
      }) : value;
    });

    return value;
  }

  private isDescending(arg: string): boolean {
    return arg[0] === '-';
  }

  private convertToString(value: any): string {
    return (value) ? value + '' : '';
  }

  private getNested(obj: object, keys: string): object {
    let tmp: any = obj;
    keys.split('.').forEach( e => { tmp = (tmp[e]) ? tmp[e] : ''; });
    return tmp;
  }

  private comparator(a: any, b: any, unsignedArg: string): number {
    const valueA = this.getNested(a, unsignedArg);
    const valueB = this.getNested(b, unsignedArg);

    const first = this.convertToString(valueA);
    const second = this.convertToString(valueB);

    return (typeof valueA === 'number' && typeof valueB === 'number') ?
    valueA - valueB : first.localeCompare(second);
  }
}
