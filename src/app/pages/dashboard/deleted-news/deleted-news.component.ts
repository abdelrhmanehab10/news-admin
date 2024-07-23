import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import { FilterOption, ListOptions } from 'src/app/models/components.model';
import { DeletedNewsService } from 'src/app/services/dashboard/deleted-news/deleted-news.service';

@Component({
  selector: 'app-deleted-news',
  templateUrl: './deleted-news.component.html',
  styleUrl: './deleted-news.component.scss',
})
export class DeletedNewsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  items: any[] = [];
  groupListOptions: ListOptions = {
    isEdit: false,
    isEnable: false,
    isDelete: true,
    edit: () => {},
    enable: () => {},
    delete: this.onDelete,
  };

  searchForm: FormGroup;

  pageNumber: number = 1;
  search = '';
  filterOption: FilterOption = {
    categoryId: '',
    subCategoryId: '',
  };

  isLoading$: Observable<boolean>;
  hasError: boolean = false;

  constructor(
    private deletedNewsService: DeletedNewsService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.isLoading$ = this.deletedNewsService.isLoading$;
  }

  ngOnInit(): void {
    this.getDeletedNews(
      this.pageNumber,
      this.search,
      this.filterOption.categoryId,
      this.filterOption.subCategoryId
    );

    this.initForm();
    this.onSearch();
  }

  onSearch() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(
        debounceTime(300), // Adjust the debounce time as needed
        distinctUntilChanged()
      )
      .subscribe((value: string) => {
        this.search = value;
        this.getDeletedNews(
          this.pageNumber,
          value,
          this.filterOption.categoryId,
          this.filterOption.subCategoryId
        );
      });
  }

  initForm() {
    this.searchForm = this.fb.group({
      search: [''],
    });
  }

  getDeletedNews(
    pageNumber: number,
    search: string,
    categoryId?: string,
    subCategoryId?: string
  ) {
    this.hasError = false;

    const getDeletedNewsSubscr = this.deletedNewsService
      .getDeletedNews(pageNumber, search, categoryId, subCategoryId)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data: { news: any[] }) => {
          if (data) {
            this.items = data.news;
            this.cdr.detectChanges();
          } else {
            this.items = [];
          }
        },
        error: (error: any) => {
          console.log('[GET_DELETED_NEWS]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getDeletedNewsSubscr);
  }

  recieveFilterOption(data: any) {
    this.filterOption = data;
    if (data.category && data.subCategory) {
      this.getDeletedNews(
        this.pageNumber,
        this.search,
        data.category,
        data.subCategory
      );
    }
  }

  onDelete() {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
