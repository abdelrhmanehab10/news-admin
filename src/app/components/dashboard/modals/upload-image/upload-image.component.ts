import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ModalConfig } from 'src/app/models/components.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent implements OnDestroy {
  @Input() type: 'upload' | 'link' = 'upload';

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
    modalTitle: this.type === 'upload' ? 'أضافة صورة' : 'رفع صورة',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'الغاء',
    customDismiss: () => {
      this.addImage();
    },
  };

  image: File | undefined = undefined;
  imageUrl: string = '';
  filePreview: string | ArrayBuffer | null | undefined = null;

  constructor(
    private fb: FormBuilder,
    private addNewService: AddNewService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService,
    private sanitizer: DomSanitizer
  ) {
    this.isLoading$ = this.addNewService.isLoading$;
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
    this.initUploadImageForm();
    this.dashboardService.galleryTypes$.subscribe((types) => {
      this.galleryTypes = types;
    });
    this.getGalleryByType();
    return await this.modalComponent.open();
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
            this.f.subCategoryId.setValue(data[0].galleryID);
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

  // imageCropped(event: ImageCroppedEvent) {
  //   this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(
  //     event.objectUrl as string
  //   );
  //   // event.blob can be used to upload the cropped image
  // }
  // imageLoaded(image: LoadedImage) {
  //   // show cropper
  // }
  // cropperReady() {
  //   // cropper ready
  // }
  // loadImageFailed() {
  //   // show message
  // }

  recieveImage(data: any) {
    this.image = data;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
