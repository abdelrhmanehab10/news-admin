import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { FilterOption, ListOptions } from 'src/app/models/components.model';
import { UrgentNewsService } from 'src/app/services/dashboard/urgent-news/urgent-news.service';

@Component({
  selector: 'app-urgent-news',
  templateUrl: './urgent-news.component.html',
  styleUrl: './urgent-news.component.scss',
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
    enable: (id: string) => {},
    delete: () => {},
  };

  filterOptions: FilterOption = {
    isOrderSubCategories: true,
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

  onEnable(editorId: string) {
    this.hasError = false;
    const toggleEnableUrgentNewSubscr = this.urgentNewsService
      .toggleEnableUrgentNew(editorId)
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.message);
          }
        },
        error: (error: any) => {
          console.log('[TOGGLE_ENABLE_EDITOR]', error);
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
