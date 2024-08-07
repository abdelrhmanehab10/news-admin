import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import { FilterOption, ListOptions } from 'src/app/models/components.model';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrl: './publish.component.scss',
})
export class PublishComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  newsToPublish: any[] = [];
  selectedNews: string[] = [];
  rolePassList: { id: string; name: string }[] = [];
  filterOptions: FilterOption = {
    isCategories: true,
    isSubCategories: true,

    categoryId: '',
    subCategoryId: '',
  };

  search: string = '';
  selectedRole: number = 1;

  groupLisOptions: ListOptions = {
    isDelete: true,
    isEdit: true,
    isCheckList: true,
    delete: () => {},
    edit: () => {},
  };

  hasError: boolean;
  isLoading$: Observable<boolean>;
  constructor(
    private publishService: PublishService,
    private utilsService: UtilsService,
    private toast: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.isLoading$ = this.publishService.isLoading$;
  }

  ngOnInit(): void {
    this.getNewsToPublish();
    this.getRolesPassList();
  }

  onSearch(e: any) {
    this.search = e.target.value;
    this.getNewsToPublish(300);
  }

  getRolesPassList(): void {
    this.hasError = false;
    const getRolesPassListSubscr = this.publishService
      .getRolesPassList()
      .subscribe({
        next: (data: { id: string; name: string }[]) => {
          this.rolePassList = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('ROLES_PASSLIST', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getRolesPassListSubscr);
  }

  getNewsToPublish(delay: number = 0): void {
    this.hasError = false;

    const getNewsToPublishSubscr = this.publishService
      .getNewsToPublish(
        this.search,
        this.filterOptions.categoryId,
        this.filterOptions.subCategoryId
      )
      .pipe(debounceTime(delay), distinctUntilChanged())
      .subscribe({
        next: (data: any[]) => {
          if (data) {
            this.newsToPublish = data;
            this.cdr.detectChanges();
          } else {
            this.newsToPublish = [];
          }
        },
        error: (error: any) => {
          console.log('[NEWS_TO_PUBLISH]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getNewsToPublishSubscr);
  }

  returnNews(): void {
    this.hasError = false;
    if (!this.selectedNews.length) return;
    const returnNewsSubscr = this.publishService
      .returnNews(this.selectedRole, this.selectedNews)
      .subscribe({
        next: (data: string) => {
          if (data) {
            this.toast.success(data);
            this.getNewsToPublish();
          }
        },
        error: (error: any) => {
          console.log('[RETURN_NEWS]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(returnNewsSubscr);
  }

  receiveSelectedNews(data: string[]) {
    this.selectedNews = data;
  }

  deleteNews(id?: string) {
    this.hasError = false;
    if (id) {
      this.selectedNews.push(id);
    }
    const deleteNewSubscr = this.publishService
      .deleteNew(this.selectedNews)
      .subscribe({
        next: (data: string) => {
          if (data) {
            this.toast.error(data);
            this.getNewsToPublish();
          }
        },
        error: (error: any) => {
          console.log('[DELETE]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(deleteNewSubscr);
  }

  publishNews(id?: string) {
    this.hasError = false;

    if (id) {
      this.selectedNews.push(id);
    }

    const publishNewSubscr = this.publishService
      .publishNews(this.selectedNews)
      .subscribe({
        next: (data: string) => {
          this.toast.success(data);
          this.getNewsToPublish();
        },
        error: (error: any) => {
          console.log('[PUBLISH]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(publishNewSubscr);
  }

  onSelectedRoleChange(e: any) {
    this.selectedRole = e.target.value;
  }

  recieveFilterOptions(data: any) {
    this.filterOptions = data;
    this.getNewsToPublish();
  }

  toggleSelectAll(e: any) {
    if (e.target.checked) {
      this.selectedNews = this.newsToPublish[0].news.map(
        (item: { id: string }) => item.id
      );
    } else {
      this.selectedNews = [];
    }
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
