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
    this.getDeletedNews();
  }

  onSearch(e: any) {
    this.search = e.target.value;
    this.getDeletedNews(
      300,
      1,
      this.search,
      this.filterOption.categoryId,
      this.filterOption.subCategoryId
    );
  }

  getDeletedNews(
    delay: number = 0,
    pageNumber?: number,
    search?: string,
    categoryId?: string,
    subCategoryId?: string
  ) {
    this.hasError = false;

    const getDeletedNewsSubscr = this.deletedNewsService
      .getDeletedNews(pageNumber, search, categoryId, subCategoryId)
      .pipe(debounceTime(delay), distinctUntilChanged())
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
      this.getDeletedNews();
    }
  }

  onDelete() {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
