import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NEW } from 'src/app/models/new.model';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  newsToPublish: NEW[];
  rolesPassList: { id: string; name: string }[];
  newsCategories: { categoryID: string; name: string }[];
  hasError: boolean;

  constructor(
    private publishService: PublishService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getNewsToPublish();
    this.getRolesPassList();
    this.getNewsCategories();
  }

  getNewsCategories(): void {
    this.hasError = false;
    const getNewsCategoriesSubscr = this.publishService
      .getNewsCategories()
      .subscribe({
        next: (data: { categoryID: string; name: string }[]) => {
          this.newsCategories = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('NEWS_CATEGORIES', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsCategoriesSubscr);
  }

  getRolesPassList(): void {
    this.hasError = false;
    const getRolesPassListSubscr = this.publishService
      .getRolesPassList()
      .subscribe({
        next: (data: { id: string; name: string }[]) => {
          this.rolesPassList = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('ROLES_PASSLIST', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getRolesPassListSubscr);
  }

  getNewsToPublish(): void {
    this.hasError = false;
    const getNewsToPublishSubscr = this.publishService
      .getNewsToPublish()
      .subscribe({
        next: (data: { news: NEW[] }[]) => {
          this.newsToPublish = data[0].news;
        },
        error: (error: any) => {
          console.log('[NEWS_TO_PUBLISH]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsToPublishSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
