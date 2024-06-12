import { Component, Input, OnInit } from '@angular/core';
import { Subscription, first } from 'rxjs';
import { NewStatusCount } from 'src/app/models/layout.model';
import { LayoutService } from 'src/app/services/layout/layout.service';

@Component({
  selector: 'app-news-status-count',
  templateUrl: './news-status-count.component.html',
  styleUrls: ['./news-status-count.component.scss'],
})
export class NewsStatusCountComponent {
  private unsubscribe: Subscription[] = [];
  cardBGColors: string[] = ['primary', 'success', 'danger', 'warning', 'info'];

  @Input() appNewsStatusCount: NewStatusCount[];
  @Input() total: number = 0;
  @Input() hasError: boolean = false;

  constructor() {}

  generateCardBGColor(id: number) {
    return this.cardBGColors[id];
  }
}
