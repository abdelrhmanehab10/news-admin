import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { FilterOption, ListOptions } from 'src/app/models/components.model';
import { UrgentNewsService } from 'src/app/services/dashboard/urgent-news/urgent-news.service';

@Component({
  selector: 'app-urgent-news',
  templateUrl: './urgent-news.component.html',
})
export class UrgentNewsComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  items: any[];
  pageNumber: number = 1;
  pageNumbers: number = 0;

  hasError: boolean = false;
  isLoading$: Observable<boolean>;

  groupListOptions: ListOptions = {
    isEdit: true,
    isEnable: true,
    isDelete: true,
    edit: () => {},
    enable: (id: string) => {
      this.toggleEnableUrgentNew(id);
    },
    delete: (id: string) => {
      this.deleteUrgentContent(id);
    },
  };

  filterOptions: FilterOption = {
    isCategories: true,
    isSubCategories: true,

    categoryId: '',
    subCategoryId: '',
  };

  constructor(
    private urgentNewsService: UrgentNewsService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUrgentNews();
  }

  getUrgentNews() {
    this.hasError = false;
    const getUrgentNewsSubscr = this.urgentNewsService
      .getUrgentNews(String(this.pageNumber))
      .subscribe({
        next: (data: { news: any[]; pageNumbers: number }) => {
          this.items = data.news;
          this.pageNumbers = data.pageNumbers;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('[GET_URGENT_NEWS]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getUrgentNewsSubscr);
  }

  deleteUrgentContent(id: string) {
    this.hasError = false;
    const deleteUrgentContentSubscr = this.urgentNewsService
      .deleteUrgentContent(id)
      .subscribe({
        next: (data: string) => {
          if (data) {
            this.toast.error(data);
            this.getUrgentNews();
          }
        },
        error: (error: any) => {
          console.log('[DELETE_URGENT_CONTENT]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(deleteUrgentContentSubscr);
  }

  toggleEnableUrgentNew(id: string) {
    this.hasError = false;
    const toggleEnableUrgentNewSubscr = this.urgentNewsService
      .toggleEnableUrgentNew(id)
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data);
            this.getUrgentNews();
          }
        },
        error: (error: any) => {
          console.log('[TOGGLE_ENABLE_URGENT_NEW]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(toggleEnableUrgentNewSubscr);
  }

  recieveIsUrgentContentAdded(data: boolean) {
    if (data) {
      this.getUrgentNews();
    }
  }
}
