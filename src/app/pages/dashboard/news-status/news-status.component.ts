import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { NEW } from 'src/app/models/new.model';
import { NewsStatusService } from 'src/app/services/dashboard/news-status/news-status.service';

@Component({
  selector: 'app-news-status',
  templateUrl: './news-status.component.html',
  styleUrl: './news-status.component.scss',
})
export class NewsStatusComponent {
  private unsubscribe: Subscription[] = [];

  news: NEW[] = [];
  searchQuery: string = '';
  selectedNews: string[] = [];
  pageNumber: number = 1;
  status: string = '';
  mainType: string = '';
  subType: string = '';

  hasError: boolean = false;

  constructor(private newsStatusService: NewsStatusService) {}

  getNews() {
    this.hasError = false;
    const getNewsSubscr = this.newsStatusService
      .getNews(
        this.pageNumber,
        this.searchQuery,
        this.status,
        this.mainType,
        this.subType
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
}
