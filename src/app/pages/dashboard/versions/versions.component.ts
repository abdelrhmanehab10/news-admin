import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { ListOptions } from 'src/app/models/components.model';
import { VersionsService } from 'src/app/services/dashboard/versions/versions.service';
import { PageInfoService } from 'src/app/services/layout/page-info.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-versions',
  templateUrl: './versions.component.html',
})
export class VersionsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  selectedNews: string[] = [];
  items: any[] = [];

  versionId: string;

  hasError: boolean;
  isLoading$: Observable<boolean>;

  groupListOptions: ListOptions = {
    isEdit: true,
    isCheckList: true,

    edit() {},
  };

  constructor(
    private pageInfoServices: PageInfoService,
    private utilsService: UtilsService,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private versionService: VersionsService
  ) {}

  ngOnInit(): void {
    this.pageInfoServices.updateTitle('الأصدارات' + ' - El Wakeel');
    this.versionId = this.route.snapshot.params.id;
    this.getNewsVersions();
  }

  getNewsVersions(): void {
    this.hasError = false;
    const getNewsVersionsSubscr = this.versionService
      .getNewsVersions(this.versionId)
      .subscribe({
        next: (data: any[]) => {
          const items = data.map((item) => ({
            date: item.date,
            news: item.newsVersions,
          }));

          this.items = items;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('NEWS_VERSIONS', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsVersionsSubscr);
  }

  toggleSelectAll(e: any) {
    this.selectedNews = this.utilsService.toggleSelectAll(
      e,
      this.items.map((items) => items.news)
    );
  }

  receiveSelectedNews(data: any) {
    this.selectedNews = data;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
