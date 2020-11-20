import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ingredientFilter',
})
export class IngredientFilterPipe implements PipeTransform {
  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;
    return items.filter((x) => {
      return JSON.stringify(x)
        .toLowerCase()
        .replace(/(\{|,)\s*(.+?)\s*:/g, '')
        .includes(searchText.toLowerCase());
    });
  }
}
