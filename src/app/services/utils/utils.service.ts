import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  toggleSelectAll(e: any, selectedItems: string[], items: any[]) {
    if (e.target.checked) {
      selectedItems = items.map((item) => String(item.sectionId));
    } else {
      selectedItems = [];
    }
  }
}
