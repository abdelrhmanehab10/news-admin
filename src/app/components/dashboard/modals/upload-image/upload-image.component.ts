import {
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalConfig } from 'src/app/models/modal.model';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent implements OnInit, OnDestroy {
  uploadImageForm: FormGroup;
  imageChangedEvent: Event | null = null;
  croppedImage: SafeUrl = '';

  private unsubscribe: Subscription[] = [];
  @ViewChild('modal') private modalComponent: ModalComponent;

  galleryTypes: { galleryTypeID: string; galleryTypeTitle: string }[] = [];
  gallery: { galleryID: string; galleryTitle: string }[] = [];

  hasError: boolean = false;

  isLoading$: Observable<boolean>;

  modalConfig: ModalConfig = {
    modalTitle: 'رفع صورة',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'الغاء',
    customDismiss: () => {
      if (!this.uploadImageForm.invalid) {
        this.addImage();
        this.modalComponent.dismiss();
      }
    },
  };

  image: File | undefined = undefined;
  imageUrl: string = '';
  filePreview: string | ArrayBuffer | null | undefined = null;

  constructor(
    private fb: FormBuilder,
    private addNewService: AddNewService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.isLoading$ = this.addNewService.isLoading$;
  }

  ngOnInit(): void {
    this.initUploadImageForm();
    this.getGalleryTypes();
    this.getGalleryByType();
  }

  get f() {
    return this.uploadImageForm.controls;
  }

  initUploadImageForm() {
    this.uploadImageForm = this.fb.group({
      subCategoryId: ['', [Validators.required]],
      Caption: ['', [Validators.required]],
      CHKWaterMark: [false],
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

  addImage() {
    this.hasError = false;
    const addImageSubscr = this.addNewService
      .addImage(
        this.f.subCategoryId.value,
        this.f.Caption.value,
        this.f.CHKWaterMark.value,
        this.imageUrl,
        0,
        0,
        0,
        0,
        this.image
      )
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data);
          }
        },
        error: (error: any) => {
          console.log('[ADD_IMAGE]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(addImageSubscr);
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
      event.objectUrl as string
    );
    // event.blob can be used to upload the cropped image
  }
  imageLoaded(image: LoadedImage) {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  recieveImage(data: any) {
    this.image = data;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
