import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.style.scss',
})
export class ListComponent {
  @Input() items: {
    newId: string;
    publishDate: string;
    title: string;
    secTitle: string;
  }[];

  colors = ['primary', 'dark'];

  constructor() {}

  timeSinceInArabic(dateString: string): string {
    const targetDate = new Date(dateString);
    const currentDate = new Date();
    const timeDifference = currentDate.getTime() - targetDate.getTime();

    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `منذ ${days} أيام`;
    } else if (hours > 0) {
      return `منذ ${hours} ساعات`;
    } else if (minutes > 0) {
      return `منذ ${minutes} دقائق`;
    } else if (seconds > 0) {
      return `منذ ${seconds} ثواني`;
    } else {
      return 'الآن';
    }
  }
}
