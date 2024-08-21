import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalConfig } from 'src/app/models/components.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { EditorsService } from 'src/app/services/dashboard/editors/editors.service';
import { GalleryService } from 'src/app/services/dashboard/gallery/gallery.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
})
export class AddGalleryComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  galleryForm: FormGroup;

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() isGalleryAddedEmitter = new EventEmitter<boolean>(false);

  isLoading$: Observable<boolean>;

  @Input() gallery: any;

  galleryTypes: any[] = [];
  type: string = '';

  modalConfig: ModalConfig = {
    modalTitle: this.type === 'edit' ? 'تعديل البوم' : 'أضافة البوم',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'اغلاق',
    customDismiss: () => {
      if (this.type === 'edit') {
        this.editGallery();
      } else {
        this.addGallery();
      }
    },
  };

  constructor(
    private fb: FormBuilder,
    private galleryService: GalleryService,
    private toast: ToastrService,
    private dashboardService: DashboardService
  ) {
    this.isLoading$ = this.galleryService.isLoading$;
  }

  ngOnInit(): void {}

  get f() {
    return this.galleryForm.controls;
  }

  initForm() {
    this.galleryForm = this.fb.group({
      GalleryTypeId: [this.gallery.GalleryTypeId ?? '', Validators.required],
      GalleryName: [this.gallery.GalleryName ?? '', Validators.required],
      GalleryDescription: [
        this.gallery.GalleryDescription ?? '',
        Validators.required,
      ],
      GalleryKeywords: [
        this.gallery.GalleryKeywords ?? '',
        Validators.required,
      ],
    });
  }

  addGallery() {
    this.isGalleryAddedEmitter.emit(false);
    const addGallerySubscr = this.galleryService
      .addGallery({
        GalleryTypeId: this.f.GalleryTypeId.value,
        GalleryName: this.f.GalleryName.value,
        GalleryDescription: this.f.GalleryDescription.value,
        GalleryKeywords: this.f.GalleryKeywords.value,
      })
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.message);
            this.isGalleryAddedEmitter.emit(true);
            this.galleryForm.reset();
            this.modalComponent.dismiss();
          }
        },
        error: (error: any) => {
          console.log('[ADD_GALLERY]', error);
          this.toast.error(error.error.message);
        },
      });
    this.unsubscribe.push(addGallerySubscr);
  }

  editGallery() {
    this.isGalleryAddedEmitter.emit(false);
    const editGallerySubscr = this.galleryService
      .editGallery({
        GalleryTypeId: this.f.GalleryTypeId.value,
        GalleryId: this.gallery.id,
        GalleryName: this.f.GalleryName.value,
        GalleryDescription: this.f.GalleryDescription.value,
        GalleryKeywords: this.f.GalleryKeywords.value,
      })
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.message);
            this.isGalleryAddedEmitter.emit(true);
            this.galleryForm.reset();
            this.modalComponent.dismiss();
          }
        },
        error: (error: any) => {
          console.log('[EDIT_GALLERY]', error);
          this.toast.error(error.error.message);
        },
      });
    this.unsubscribe.push(editGallerySubscr);
  }

  async openModal() {
    this.initForm();
    this.dashboardService.galleryTypes$.subscribe((types) => {
      this.galleryTypes = types;
    });
    return await this.modalComponent.open();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
