// import { Component, OnInit } from '@angular/core';
// import { Subscription, first } from 'rxjs';
// import { Router } from '@angular/router';
// import { NewStatusCount } from 'src/app/models/layout.model';
// import { LayoutService } from '../..';

// @Component({
//   selector: 'app-news-status-count',
//   templateUrl: './news-status-count.component.html',
//   styleUrls: ['./news-status-count.component.scss'],
// })
// export class NewsStatusCountComponent implements OnInit {
//   private unsubscribe: Subscription[] = [];
//   cardBGColors: string[] = [
//     'primary',
//     'secondary',
//     'success',
//     'danger',
//     'warning',
//     'info',
//     'light',
//     'dark',
//   ];

//   appNewsStatusCount: NewStatusCount[] = [];
//   total: number = 0;

//   hasError: boolean = false;
//   displayCounters = false;

//   constructor(private layout: LayoutService, private router: Router) {}

//   ngOnInit(): void {
//     this.updateNewsStatusCount();
//   }

//   updateNewsStatusCount() {
//     this.hasError = false;
//     const loginSubscr = this.layout
//       .getNewsStatusCount()
//       .pipe(first())
//       .subscribe({
//         next: (data) => {
//           this.total = data.reduce(
//             (a: number, c: NewStatusCount) => a + c.count,
//             0
//           );
//           this.appNewsStatusCount = data;
//         },
//         error: (error) => {
//           console.log('[NEWS_STATUS_COUNT]', error);
//           this.hasError = true;
//         },
//       });
//     this.unsubscribe.push(loginSubscr);
//   }

//   generateCardBGColor(id: number) {
//     return this.cardBGColors[id];
//   }
// }
