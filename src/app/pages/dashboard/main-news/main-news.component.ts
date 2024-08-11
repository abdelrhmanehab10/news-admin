import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import {
  FilterOption,
  ListOptions,
  Pagination,
} from 'src/app/models/components.model';
import { MainNewsService } from 'src/app/services/dashboard/main-news/main-news.service';

@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrl: './main-news.component.scss',
})
export class MainNewsComponent implements OnDestroy, OnInit {
  private unsubscribe: Subscription[] = [];

  items: any[] = [];

  groupListOptions: ListOptions = {
    isDelete: true,
    isVersion: true,
    delete: (id?: string) => {
      if (id) {
        this.deleteNew(id);
      }
    },
    enable: () => {},
    edit: () => {},
  };
  pagination: Pagination = {
    count: 1,
    pages: [1],
    current: 1,
  };
  pageNumbers: number = 1;
  filterOption: FilterOption = {
    isCategories: true,
    isSubCategories: true,
    isType: true,
    categoryId: '',
    subCategoryId: '',
    typeId: '',
  };
  search: string = '';

  hasError: boolean = false;
  isLoading$: Observable<boolean>;

  constructor(
    private mainNewsService: MainNewsService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService
  ) {
    this.isLoading$ = this.mainNewsService.isLoading$;
  }

  ngOnInit(): void {
    this.getPublishedNews();
  }

  getPublishedNews() {
    this.hasError = false;

    const getPublishedNewsSubscr = this.mainNewsService
      .getPublishedNews(
        this.pagination.current,
        this.search,
        this.filterOption.categoryId,
        this.filterOption.subCategoryId
      )
      .subscribe({
        next: (data: { news: any[]; count: number; pageNumbers: number }) => {
          this.items = data.news;

          this.pagination.pages = Array.from(
            { length: data.pageNumbers },
            (_, i) => i + 1
          );
          this.pagination.count = data.count;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('[GET_PUBLISHED_NEWS]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getPublishedNewsSubscr);
  }

  deleteNew(id: string) {
    this.hasError = false;

    const deleteNewSubscr = this.mainNewsService.deleteNew(id).subscribe({
      next: (data: string) => {
        if (data) {
          this.toast.error(data);
          this.getPublishedNews();
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[DELETE_NEW]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(deleteNewSubscr);
  }

  recieveFilterOption(data: FilterOption) {
    this.filterOption = data;
    this.getPublishedNews();
  }

  recieveChangedPage(data: number) {
    this.pagination.current = data;
    this.getPublishedNews();
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
