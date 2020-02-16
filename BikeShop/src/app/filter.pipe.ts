import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: any[], filter: any): any { // to filter items on the list
    if (!items || !filter) {
        return items;
    }
    return items.filter(item => item.name.indexOf(filter) !== -1);
}

}
