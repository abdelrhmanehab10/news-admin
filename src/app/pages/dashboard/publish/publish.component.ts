import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  Subscription,
} from 'rxjs';
import {
  FilterOption,
  ListOptions,
  TableOption,
} from 'src/app/models/components.model';
import { NEW } from 'src/app/models/new.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
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
  selectedRole: string;
  searchForm: FormGroup;

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
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {
    this.isLoading$ = this.publishService.isLoading$;
  }

  ngOnInit(): void {
    this.getNewsToPublish();
    this.getRolesPassList();

    this.initForm();
    this.onSearch();
  }

  onSearch() {
    this.searchForm
      .get('search')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value: string) => {
        this.search = value;
        this.getNewsToPublish(
          value,
          this.filterOptions.categoryId,
          this.filterOptions.subCategoryId
        );
      });
  }

  initForm() {
    this.searchForm = this.fb.group({
      search: [''],
    });
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

  getNewsToPublish(
    search?: string,
    categoryId?: string,
    subCategoryId?: string
  ): void {
    this.hasError = false;

    const getNewsToPublishSubscr = this.publishService
      .getNewsToPublish(search, categoryId, subCategoryId)
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

  publish() {
    //publish new logic
  }

  returnNews(): void {
    this.hasError = false;
    const returnNewsSubscr = this.publishService
      .returnNews(this.selectedRole, this.selectedNews)
      .subscribe({
        next: (data: any[]) => {
          if (data) {
            this.newsToPublish = data;
            this.cdr.detectChanges();
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
          this.toastr.error(data);
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
          this.toastr.success(data);
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
    this.getNewsToPublish(this.search, data.categoryId, data.subCategoryId);
  }

  recieveSelectedNews(data: any) {
    this.selectedNews = data;
  }

  toggleSelectAll(e: any) {
    this.selectedNews = this.utilsService.toggleSelectAll(
      e,
      this.newsToPublish.map((items) => items.news)
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
