import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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

  constructor(
    private urgentNewsService: UrgentNewsService,
    private cdr: ChangeDetectorRef
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

  recieveIsUrgentContentAdded(data: boolean) {
    if (data) {
      this.getUrgentNews();
    }
  }
}
