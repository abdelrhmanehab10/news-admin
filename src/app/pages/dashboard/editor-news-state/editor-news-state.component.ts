import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { FilterOption, TableOption } from 'src/app/models/components.model';
import { EditorNewsStatusService } from 'src/app/services/dashboard/editor-news-status/editor-news-status.service';

@Component({
  selector: 'app-editor-news-state',
  templateUrl: './editor-news-state.component.html',
  styleUrl: './editor-news-state.component.scss',
})
export class EditorNewsStateComponent implements OnDestroy {
  private unsubscribe: Subscription[] = [];

  news: any[] = [];
  selectedNews: string[] = [];
  pageNumber: number = 1;
  filterOption: FilterOption = {
    categoryId: '',
    subCategoryId: '',
    statusId: '',
    roleId: '',
  };
  hasError: boolean = false;
  status: string;

  constructor(private editorNewsStatusService: EditorNewsStatusService) {}

  getMyNews() {
    this.hasError = false;
    const getMyNewsSubscr = this.editorNewsStatusService
      .getMyNews(this.pageNumber, this.filterOption.statusId)
      .subscribe({
        next: (data: { news: any[] }[]) => {
          if (data) {
            this.news = data[0]?.news;
          }
        },
        error: (error: any) => {
          console.log('[MY_NEWS]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getMyNewsSubscr);
  }

  receiveSelectedNews(data: string[]) {
    this.selectedNews = data;
  }

  recievePageNumber(data: number) {
    this.pageNumber = data;
  }

  recieveFilterOption(data: FilterOption) {
    this.filterOption = data;
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
