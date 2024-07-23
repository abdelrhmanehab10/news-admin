import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { distinctUntilChanged, Observable, Subscription } from 'rxjs';
import { CustomButton, TableOption } from 'src/app/models/components.model';
import {
  Album,
  Category,
  ContentType,
  SubCategory,
} from 'src/app/models/data.model';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

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

  contentTypes: ContentType[] = [];
  subCategories: SubCategory[] = [];
  categories: Category[] = [];
  albums: Album[] = [];
  drafts: any[] = [];

  selectedAlbums: Album[] = [];
  selectedImage: any = null;
  attachment: any = null;
  img2Id: number = 0;
  picCaption2: string = '';
  Story: string = '';
  tags: string[] = [];
  date: string = '';
  tableOptions: TableOption = {
    isDraft: true,
    title: 'يوجد درافت او اكثر اثناء العمل على اضافة خبر',
  };
  customBtnsOptions: CustomButton[] = [
    { content: 'حذف الكل', bgColor: 'danger', click: this.deleteAllDrafts },
  ];

  constructor(
    private dashboardService: DashboardService,
    private addNewService: AddNewService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService,
    private fb: FormBuilder
  ) {
    this.isLoading$ = this.addNewService.isLoading$;
  }

  ngOnInit(): void {
    this.initAddNewForm();
    this.getDrafts();
    this.getGalleries();
    this.dashboardService.contentTypes$.subscribe((conetntTypes) => {
      this.contentTypes = conetntTypes;
    });
    this.dashboardService.categories$.subscribe((categories) => {
      this.categories = categories;
    });
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
    const addNewSubscr = this.addNewService.getGalleries().subscribe({
      next: (data: any) => {
        if (data) {
          this.albums = data;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[ADD_NEW]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(addNewSubscr);
  }

  initAddNewForm() {
    this.addNewForm = this.fb.group({
      NewsType: ['', [Validators.required]],
      CatId: ['', [Validators.required]],
      sectionId: ['', [Validators.required]],
      ByLine: ['', [Validators.required]],
      Title: ['', [Validators.required]],
      SubTitle: [''],
      Brief: ['', [Validators.required]],
      PictureCaption1: ['', [Validators.required]],
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
        this.img2Id,
        this.f.PictureCaption1.value,
        this.picCaption2,
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

  recieveSelectedImage(
    data: {
      icon: string;
      title: string;
      description: string;
      id: number;
    } | null
  ) {
    this.selectedImage = data;
  }

  recieveStory(data: string) {
    this.Story = data;
  }

  recieveTags(data: string[]) {
    this.tags = data;
  }

  recieveDate(data: string) {
    this.date = data;
  }

  recieveAttachment(data: any) {
    this.attachment = data;
  }

  getDrafts() {
    this.hasError = false;
    const getDraftsSubscr = this.addNewService.getDrafts().subscribe({
      next: (data: typeof this.drafts) => {
        if (data) {
          const items = data.map((item) => ({
            title: item.title,
            category: item.secTitle,
            dateWithTime: item.createdDate,
          }));
          this.drafts = items;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[DRAFTS]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getDraftsSubscr);
  }

  deleteAllDrafts() {
    this.hasError = false;
    const getDraftsSubscr = this.addNewService.deleteAllDrafts().subscribe({
      next: (data: any) => {
        if (data) {
          this.toast.error(data.message);
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[DELETE_DRAFTS]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getDraftsSubscr);
  }
}
