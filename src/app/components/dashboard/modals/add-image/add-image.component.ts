import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalConfig } from 'src/app/models/modal';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrl: './add-image.component.scss',
})
export class AddImageComponent implements OnInit {
  defaultFilterOption: {
    pageNumber: string;
    GalleryTypeId: string;
    GalleryId: string;
    searchText: string;
  } = {
    pageNumber: '1',
    GalleryId: '',
    GalleryTypeId: '',
    searchText: '',
  };

  filterForm: FormGroup;

  private unsubscribe: Subscription[] = [];
  @ViewChild('modal') private modalComponent: ModalComponent;

  galleryTypes: { galleryTypeID: string; galleryTypeTitle: string }[] = [];
  gallery: { galleryID: string; galleryTitle: string }[] = [];
  images: {
    id: string;
    picName: string;
    picPath: string;
    picCaption: string;
    addedDate: string;
  }[] = [];
  hasError: boolean = false;

  isLoading$: Observable<boolean>;

  modalConfig: ModalConfig = {
    modalTitle: 'اختيار صورة',
    dismissButtonLabel: 'تأكيد',
    closeButtonLabel: 'الغاء',
  };

  constructor(
    private fb: FormBuilder,
    private addNewService: AddNewService,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.addNewService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
    this.getGalleryTypes();
    this.getGalleryByType();
    this.getGalleryImages();
  }

  get f() {
    return this.filterForm.controls;
  }

  initForm() {
    this.filterForm = this.fb.group({
      pageNumber: [this.defaultFilterOption.pageNumber, Validators.required],
      GalleryTypeId: [this.defaultFilterOption.GalleryTypeId],
      GalleryId: [this.defaultFilterOption.GalleryId],
      searchText: [this.defaultFilterOption.searchText],
    });
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  getGalleryTypes() {
    this.hasError = false;
    const getGalleryTypesSubscr = this.addNewService
      .getGalleryTypes()
      .subscribe({
        next: (data: typeof this.galleryTypes) => {
          if (data) {
            this.galleryTypes = data;
            this.cdr.detectChanges();
          }
        },
        error: (error: any) => {
          console.log('[GalleryTypes]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getGalleryTypesSubscr);
  }

  getGalleryByType(e?: any) {
    const galleryId = e ? e.target.value : this.galleryTypes[0]?.galleryTypeID;
    this.hasError = false;
    const getGalleryByTypeSubscr = this.addNewService
      .getGalleryByType(galleryId)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data: typeof this.gallery) => {
          if (data) {
            this.gallery = data;
            this.cdr.detectChanges();
          } else {
            this.gallery = [];
          }
        },
        error: (error: any) => {
          console.log('[Gallery]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getGalleryByTypeSubscr);
  }

  getGalleryImages() {
    this.hasError = false;
    const getGalleryImagesSubscr = this.addNewService
      .getGalleryImages({
        pageNumber: this.f.pageNumber.value,
        GalleryId: this.f.GalleryId.value,
        GalleryTypeId: this.f.GalleryTypeId.value,
        searchText: this.f.searchText.value,
      })
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data: {
          pageNumbers: number;
          count: number;
          images: {
            id: string;
            picName: string;
            picPath: string;
            picCaption: string;
            addedDate: string;
          }[];
        }) => {
          if (data) {
            this.images = data.images;
            this.cdr.detectChanges();
          } else {
            this.images = [];
          }
        },
        error: (error: any) => {
          console.log('[Gallery_IMAGES]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getGalleryImagesSubscr);
  }
}
