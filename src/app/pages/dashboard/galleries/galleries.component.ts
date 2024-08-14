import { Component } from '@angular/core';
import { FilterOption } from 'src/app/models/components.model';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
})
export class GalleriesComponent {
  filterOptions: FilterOption = {
    isGallery: true,
    galleryId: '',
  };

  recieveFilterOption(data: any) {
    this.filterOptions = data;
  }
}
