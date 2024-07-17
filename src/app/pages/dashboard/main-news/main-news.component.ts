import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-news',
  templateUrl: './main-news.component.html',
  styleUrl: './main-news.component.scss',
})
export class MainNewsComponent {
  private unsubscribe: Subscription[] = [];
}
