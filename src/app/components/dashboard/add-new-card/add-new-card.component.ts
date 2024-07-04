import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TempusDominus } from '@eonasdan/tempus-dominus';
import Tagify from '@yaireo/tagify';
import { CKEditor4 } from 'ckeditor4-angular';
import { Observable, Subscription } from 'rxjs';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';
import $ from 'jquery';
import moment from 'moment';
import 'daterangepicker';
import { ModalConfig } from 'src/app/models/modal';
import { ModalComponent } from '../../shared/modal/modal.component';
@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
  styleUrl: './add-new-card.component.scss',
})
export class AddNewCardComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  defaultNew: { contentType: string; image1Id: string } = {
    contentType: '1',
    image1Id: '',
  };

  addNewForm: FormGroup;

  isLoading$: Observable<boolean>;

  contentTypes: { typeId: string; contentType1: string }[] = [];
  albums: { galleryID: string; galleryTitle: string }[] = [];
  editorData = '<p>Hello, world!</p>';

  hasError: boolean = false;
  selectedFile: File | null = null;
  filePreview: string | ArrayBuffer | null | undefined = null;

  @ViewChild('albumSelect') albumSelect: ElementRef;

  constructor(
    private addNewService: AddNewService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.addNewService.isLoading$;
  }

  public onChange(event: CKEditor4.EventInfo) {
    this.editorData = event.editor.getData();
    console.log(this.editorData);
  }

  ngOnInit(): void {
    this.getContentTypes();
    this.getGalleries();
    this.initForm();
  }

  ngAfterViewInit() {
    const tagifyInput = document.querySelector(
      '#kt_tagify_1'
    ) as HTMLInputElement;
    new Tagify(tagifyInput, {
      duplicates: false,
    });

    $('#kt_daterangepicker_2').daterangepicker({
      timePicker: true,
      singleDatePicker: true,
      parentEl: '.date',

      startDate: moment().startOf('hour'),
      endDate: moment().startOf('hour').add(32, 'hour'),
      locale: {
        format: 'M/DD hh:mm A',
      },
    });
  }

  getGalleries() {
    this.hasError = false;
    const getGalleriesSubscr = this.addNewService.getGalleries().subscribe({
      next: (data: { galleryID: string; galleryTitle: string }[]) => {
        if (data) {
          this.albums = data;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[Galleries]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getGalleriesSubscr);
  }

  getContentTypes() {
    this.hasError = false;
    const getContentTypesSubscr = this.addNewService
      .getContentTypes()
      .subscribe({
        next: (data: typeof this.contentTypes) => {
          if (data) {
            this.contentTypes = data;
            this.cdr.detectChanges();
          }
        },
        error: (error: any) => {
          console.log('[CONTENT_TYPES]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getContentTypesSubscr);
  }

  get f() {
    return this.addNewForm.controls;
  }

  initForm() {
    this.addNewForm = this.fb.group({
      contentType: [this.defaultNew.contentType],
      image1Id: [this.defaultNew.image1Id],
    });
  }

  onSaveNew() {}

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

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
