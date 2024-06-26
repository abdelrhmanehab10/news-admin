import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { NewStatusCount } from 'src/app/models/layout.model';
import { LayoutService } from 'src/app/services/layout/layout.service';

@Component({
  selector: 'app-news-status-count',
  templateUrl: './news-status-count.component.html',
  styleUrls: ['./news-status-count.component.scss'],
})
export class NewsStatusCountComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  cardBGColors: string[] = ['primary', 'success', 'danger', 'warning', 'info'];

  appNewsStatusCount: NewStatusCount[];
  total: number = 0;
  hasError: boolean = false;

  constructor(private layout: LayoutService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.updateNewsStatusCount();
  }

  generateCardBGColor(id: number) {
    return this.cardBGColors[id];
  }

  updateNewsStatusCount() {
    this.hasError = false;
    const getNewsStatusCountSubscr = this.layout
      .getNewsStatusCount()
      .subscribe({
        next: (data: NewStatusCount[]) => {
          this.total = data.reduce(
            (a: number, c: NewStatusCount) => a + c.count,
            0
          );
          this.appNewsStatusCount = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('[NEWS_STATUS_COUNT]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsStatusCountSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
