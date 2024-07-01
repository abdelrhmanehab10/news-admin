import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NEW } from 'src/app/models/new.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  selectedNews: string[] = [];

  newsToPublish: NEW[];
  rolesPassList: { id: string; name: string }[];
  newsCategories: { categoryID: string; name: string }[];

  hasError: boolean;

  constructor(
    private publishService: PublishService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getNewsToPublish();
  }

  getNewsToPublish(): void {
    this.hasError = false;
    const getNewsToPublishSubscr = this.publishService
      .getNewsToPublish()
      .subscribe({
        next: (data: { news: NEW[] }[]) => {
          if (data) {
            this.newsToPublish = data[0]?.news;
          }
        },
        error: (error: any) => {
          console.log('[NEWS_TO_PUBLISH]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsToPublishSubscr);
  }

  publish() {
    //publish new logic
  }

  restore() {
    //restore new
  }

  receiveSelectedNews(data: string[]) {
    this.selectedNews = data;
  }

  deleteNew(id?: string) {
    this.hasError = false;
    if (id) {
      this.selectedNews.push(id);
    }

    const deleteNewSubscr = this.publishService
      .deleteNew(this.selectedNews)
      .subscribe({
        next: (data: string) => {
          this.toastr.success(data);
        },
        error: (error: any) => {
          console.log('[DELETE]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(deleteNewSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
