import { Component, Input, OnInit } from '@angular/core';
import { LayoutService } from '../../core/layout.service';
import { Subscription, first } from 'rxjs';
import { NewStatusCount } from '../../models/counter';

@Component({
  selector: 'app-news-status-count',
  templateUrl: './news-status-count.component.html',
  styleUrls: ['./news-status-count.component.scss'],
})
export class NewsStatusCountComponent implements OnInit {
  private unsubscribe: Subscription[] = [];
  cardBGColors: string[] = ['primary', 'info', 'success', 'danger', 'warning'];
  appNewsStatusCount: NewStatusCount[] = [];
  total: number = 0;
  hasError: boolean = false;

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.updateNewsStatusCount();
  }

  updateNewsStatusCount() {
    this.hasError = false;
    const loginSubscr = this.layout
      .getNewsStatusCount()
      .pipe(first())
      .subscribe((data) => {
        if (data) {
          this.total = data.reduce(
            (a: number, c: NewStatusCount) => a + c.count,
            0
          );
          this.appNewsStatusCount = data;
        } else {
          this.hasError = true;
        }
      });
    this.unsubscribe.push(loginSubscr);
  }

  generateCardBGColor(id: number) {
    return this.cardBGColors[id];
  }
}
