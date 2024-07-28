import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  toggleSelectAll(e: any, items: any[]) {
    if (e.target.checked) {
      return items.map((item) => String(item.id));
    } else {
      return [];
    }
  }

  fileValidator(maxSizeMB: number, allowedTypes: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const file = control.value as File;

      if (!file) {
        return null; // no file selected
      }

      const fileSizeMB = file.size / (1024 * 1024);
      if (fileSizeMB > maxSizeMB) {
        return { maxSize: { requiredSize: maxSizeMB, actualSize: fileSizeMB } };
      }

      if (!allowedTypes.includes(file.type)) {
        return {
          allowedTypes: { requiredTypes: allowedTypes, actualType: file.type },
        };
      }

      return null;
    };
  }
}
