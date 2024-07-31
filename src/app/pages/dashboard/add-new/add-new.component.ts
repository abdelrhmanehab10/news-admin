import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { CustomButton, TableOption } from 'src/app/models/components.model';
import {
  Album,
  Category,
  ContentType,
  ContentTypeSetting,
  SubCategory,
  ValidationRule,
} from 'src/app/models/data.model';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { EditorsService } from 'src/app/services/dashboard/editors/editors.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss',
})
export class AddNewComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  addNewForm: FormGroup;

  isLoading$: Observable<boolean>;
  hasError: boolean = false;

  contentTypesSetting: ContentTypeSetting[] = [];

  contentTypes: ContentType[] = [];
  categories: Category[] = [];
  subCategories: SubCategory[] = [];
  albums: Album[] = [];
  editors: any[] = [];

  contentTypeID: number = 1;

  selectedAlbums: Album[] = [];
  selectedImage: any = null;
  restoredDraft: any;
  attachment: any = null;
  Story: string = '';
  tags: string[] = [];
  date: string = '';

  constructor(
    private dashboardService: DashboardService,
    private addNewService: AddNewService,
    private editorsService: EditorsService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.isLoading$ = this.addNewService.isLoading$;
  }

  ngOnInit(): void {
    this.initAddNewForm(this.contentTypeID, this.contentTypesSetting);
    this.getContentTypeSetting();
    this.getGalleries();
    this.getAllEditors();
    this.dashboardService.contentTypes$.subscribe((conetntTypes) => {
      this.contentTypes = conetntTypes;
    });
    this.dashboardService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
  }

  //TinyMCE
  TINY_MCE_API_KEY: string = environment.TINY_MCE_API_KEY;
  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    directionality: 'rtl',
    language: 'ar',
  };

  onNewsTypeChange(e: any) {
    this.contentTypeID = e.target.value;
    this.initAddNewForm(this.contentTypeID, this.contentTypesSetting);
  }

  onCategoryChange(e: any) {
    this.hasError = false;
    const getNewsSubCategoriesSubscr = this.dashboardService
      .getNewsSubCategories(e.target.value)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data: { sectionID: string; secTitle: string }[]) => {
          this.subCategories = data;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.log('NEWS_SUB_CATEGORIES', err);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsSubCategoriesSubscr);
  }

  getGalleries() {
    this.hasError = false;
    const getGalleriesSubscr = this.addNewService.getGalleries().subscribe({
      next: (data: any) => {
        if (data) {
          this.albums = data;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[GET_GALLERIES]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getGalleriesSubscr);
  }

  applyValidationRules(formGroup: FormGroup, rules: ValidationRule[]) {
    rules.forEach((rule) => {
      if (!rule.value && formGroup.contains(rule.keyName)) {
        formGroup.removeControl(rule.keyName);
      }
    });

    rules.forEach((rule) => {
      if (rule.value) {
        const control = formGroup.get(rule.keyName);
        const existingValidators =
          control && control.validator
            ? control.validator({} as AbstractControl)
            : null;
        const newValidators = [];

        if (existingValidators) {
          Object.keys(existingValidators).forEach((key) => {
            if (key !== 'minlength' && key !== 'maxlength') {
              newValidators.push(existingValidators[key]);
            }
          });
        }

        if (rule.valueMin !== 0) {
          newValidators.push(Validators.minLength(rule.valueMin));
        }
        if (rule.valueMax !== 0) {
          newValidators.push(Validators.maxLength(rule.valueMax));
        }
        if (rule.keyName === 'ByLine') {
          newValidators.push(Validators.required);
        }

        if (control) {
          control.setValidators(newValidators);
          control.updateValueAndValidity();
        } else {
          formGroup.addControl(
            rule.keyName,
            this.fb.control('', newValidators)
          );
        }
      }
    });
  }

  initAddNewForm(contentTypeID: number, rules: ValidationRule[]) {
    this.addNewForm = this.fb.group({
      NewsType: [contentTypeID, [Validators.required]],
      CatId: ['', [Validators.required]],
      sectionId: ['', [Validators.required]],
      ByLine: ['', []],
      Title: ['', []],
      SubTitle: [''],
      Brief: ['', []],
      PictureCaption1: ['', []],
      Notes: [''],
      ChkNewsTicker: [false],
      ChkTopNews: [false],
      ChkReadNow: [false],
      ChkIsInstall: [false],
      ChkIsImage: [false],
      ChkIsAkhbarKhassa: [false],
      ChkTopNewCategory: [false],
      ChkTopNewSection: [false],
      ChkImportantNews: [false],
      ChkFilesNews: [false],
      ChkIsVideo: [false],
      ChkIsAkbhbarKhassa: [false],
    });

    const relevantRules = rules.filter(
      (rule) => rule.contentTypeID == contentTypeID
    );
    this.applyValidationRules(this.addNewForm, relevantRules);
  }

  get f() {
    return this.addNewForm.controls;
  }

  onRemoveAlbum(albumId: string) {
    this.selectedAlbums = this.selectedAlbums.filter(
      (album) => album.galleryID !== albumId
    );
  }

  onSelectAlbum(id: string) {
    const selectedAlbum = this.albums.find((album) => album.galleryID == id);

    if (
      this.selectedAlbums.find(
        (album) => album.galleryID === selectedAlbum?.galleryID
      )
    )
      return;

    this.selectedAlbums.push(
      selectedAlbum as {
        galleryID: string;
        galleryTitle: string;
      }
    );
  }

  addNew() {
    this.hasError = false;
    const addNewSubscr = this.addNewService
      .addNew(
        1,
        this.f.sectionId.value,
        this.f.CatId.value,
        this.f.NewsType.value,
        this.f.Title.value,
        this.f.SubTitle.value,
        this.Story,
        this.f.Brief.value,
        this.tags,
        this.selectedImage.id,
        0,
        this.f.PictureCaption1.value,
        '',
        this.f.ByLine.value,
        this.f.Notes.value,
        this.selectedAlbums.map((sa) => sa.galleryID),
        this.f.ChkNewsTicker.value,
        this.f.ChkTopNews.value,
        this.f.ChkTopNewCategory.value,
        this.f.ChkReadNow.value,
        this.f.ChkImportantNews.value,
        this.f.ChkFilesNews.value,
        this.f.ChkTopNewSection.value,
        this.f.ChkIsVideo.value,
        this.f.ChkIsInstall.value,
        this.f.ChkIsAkbhbarKhassa.value,
        this.f.ChkIsImage.value,
        this.date
      )
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data);
          }
        },
        error: (error: any) => {
          console.log('[ADD_NEW]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(addNewSubscr);
  }

  receiver(recevier: string, data: any) {
    (this as any)[recevier] = data;
    // console.log(data);
    // if (recevier === 'restoredDraft') {
    //   console.log(data.NewsType);

    //   this.addNewForm.patchValue({
    //     NewsType: data?.newsType,
    //     CatId: data?.categoryId,
    //     sectionId: data?.sectionId,
    //     ByLine: data?.byLine,
    //     Title: data?.title,
    //     SubTitle: data?.subTitle,
    //     Brief: data?.brief,
    //     PictureCaption1: data?.pictureCaption1,
    //     Notes: data?.notes,
    //     ChkNewsTicker: data?.ChkNewsTicker,
    //     ChkTopNews: data?.ChkTopNews,
    //     ChkReadNow: data?.ChkReadNow,
    //     ChkIsInstall: data?.ChkIsInstall,
    //     ChkIsImage: data?.ChkIsImage,
    //     ChkIsAkhbarKhassa: data?.ChkIsAkhbarKhassa,
    //     ChkTopNewCategory: data?.ChkTopNewCategory,
    //     ChkTopNewSection: data?.ChkTopNewSection,
    //     ChkImportantNews: data?.ChkImportantNews,
    //     ChkFilesNews: data?.ChkFilesNews,
    //     ChkIsVideo: data?.ChkIsVideo,
    //     ChkIsAkbhbarKhassa: data?.ChkIsAkbhbarKhassa,
    //   });

    //   this.Story = data?.story;
    //   this.tags = data?.tags;
    //   this.selectedImage = data?.selectedImage;
    //   this.date = data?.date;
    //   this.selectedAlbums = data?.selectedAlbums;
    //   this.attachment = data?.attachment;
    // }
  }

  getContentTypeSetting() {
    this.hasError = false;
    const getContentTypeSettingSubscr = this.dashboardService
      .getContentTypeSetting()
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.contentTypesSetting = data;
            this.initAddNewForm(this.contentTypeID, data);
          }
        },
        error: (error: any) => {
          console.log('[CONTENT_TYPE_SETTING]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getContentTypeSettingSubscr);
  }

  getAllEditors() {
    this.hasError = false;
    const getAllEditorsSubscr = this.editorsService.getAllEditors().subscribe({
      next: (data: any) => {
        if (data) {
          this.editors = data;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[GET_ALL_EDITORS]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getAllEditorsSubscr);
  }
}
