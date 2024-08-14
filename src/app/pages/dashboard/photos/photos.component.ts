import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import { FilterOption } from 'src/app/models/components.model';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
})
export class PhotosComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  search: string = '';
  pageNumber: number = 1;
  filterOption: FilterOption = {
    isGalleryType: true,
    isGallery: true,

    galleryTypeId: '',
    galleryId: '',
  };

  $isLoading: Observable<boolean>;

  images: any[] = [];

  constructor(
    private addNewService: AddNewService,
    private cdr: ChangeDetectorRef
  ) {
    this.$isLoading = addNewService.isLoading$;
  }

  ngOnInit(): void {
    this.getImages();
  }

  onSearch(e: any) {
    this.search = e.target.value;
    this.getImages(300, e.target.value);
  }

  getImages(delay: number = 0, search?: string) {
    const getImagesSubscr = this.addNewService
      .getGalleryImages(
        this.pageNumber,
        this.filterOption.galleryTypeId,
        this.filterOption.galleryId,
        search ? search : this.search
      )
      .pipe(debounceTime(delay), distinctUntilChanged())
      .subscribe({
        next: (data: { images: any[] }) => {
          if (data) {
            this.images = data.images.map((img) => ({
              date: img.addedDate,
              icon: img.picPath,
              name: img.picName,
              description: img.picCaption,
            }));
            this.cdr.detectChanges();
          } else {
            this.images = [];
          }
        },
        error: (error: any) => {
          console.log('[GET_IMAGES]', error);
        },
      });
    this.unsubscribe.push(getImagesSubscr);
  }

  recieveFilterOption(data: any) {
    this.filterOption = data;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
