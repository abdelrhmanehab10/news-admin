import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterOption, NEW } from 'src/app/models/new.model';
import { NewsStatusService } from 'src/app/services/dashboard/news-status/news-status.service';

@Component({
  selector: 'app-news-status',
  templateUrl: './news-status.component.html',
  styleUrl: './news-status.component.scss',
})
export class NewsStatusComponent implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  news: NEW[] = [];
  searchQuery: string = '';
  selectedNews: string[] = [];
  pageNumber: number = 1;
  filterOption: FilterOption = {
    category: '',
    status: '',
    role: '',
    subCategory: '',
  };
  hasError: boolean = false;

  constructor(private newsStatusService: NewsStatusService) {}

  getNews() {
    this.hasError = false;
    const getNewsSubscr = this.newsStatusService
      .getNews(
        this.pageNumber,
        this.searchQuery,
        this.filterOption.status,
        this.filterOption.category,
        this.filterOption.subCategory
      )
      .subscribe({
        next: (data: { news: NEW[] }[]) => {
          if (data) {
            this.news = data[0]?.news;
          }
        },
        error: (error: any) => {
          console.log('[NEWS]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsSubscr);
  }

  receiveSelectedNews(data: string[]) {
    this.selectedNews = data;
  }

  recieveSearchQuery(data: string) {
    this.searchQuery = data;
  }

  recievePageNumber(data: number) {
    this.pageNumber = data;
  }

  recieveFilterOption(data: FilterOption) {
    console.log(data);
    this.filterOption = data;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
