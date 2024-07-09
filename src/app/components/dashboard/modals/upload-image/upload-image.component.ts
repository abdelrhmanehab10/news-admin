import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalConfig } from 'src/app/models/modal';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrl: './upload-image.component.scss',
})
export class UploadImageComponent implements OnInit {
  defaultUploadImageForm: {
    GalleryTypeId: string;
    GalleryId: string;
  } = {
    GalleryId: '',
    GalleryTypeId: '',
  };

  uploadImageForm: FormGroup;

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
  };

  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null | undefined = null;

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
  }

  get f() {
    return this.uploadImageForm.controls;
  }

  initForm() {
    this.uploadImageForm = this.fb.group({
      GalleryTypeId: [this.defaultUploadImageForm.GalleryTypeId],
      GalleryId: [this.defaultUploadImageForm.GalleryId],
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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewFile(this.selectedFile);
      this.cdr.detectChanges();
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.filePreview = e.target?.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  removeSelectedImg() {
    this.selectedFile = null;
    this.filePreview = null;
    this.cdr.detectChanges();
  }
}
