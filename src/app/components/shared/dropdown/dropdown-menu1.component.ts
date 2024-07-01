import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { FilterOption } from 'src/app/models/new.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';

@Component({
  selector: 'app-dropdown-menu1',
  templateUrl: './dropdown-menu1.component.html',
})
export class DropdownMenu1Component implements OnInit, OnDestroy {
  defaultFilterValues: {
    role: string;
    category: string;
    subCategory: string;
    status: string;
  } = {
    role: '',
    category: '',
    subCategory: '',
    status: '',
  };

  private unsubscribe: Subscription[] = [];

  filterForm: FormGroup;

  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  @Output() filterOptionsEmitter = new EventEmitter<FilterOption>();

  //Filtration Methods
  @Input() isRoles: boolean = false;
  @Input() isCategories: boolean = false;
  @Input() isSubCategories: boolean = false;
  @Input() isStatus: boolean = false;

  rolesPassList: { id: string; name: string }[];
  newsCategories: { categoryID: string; name: string }[] = [];
  newsSubCategories: { sectionID: string; secTitle: string }[] = [];
  newsStatus: { id: string; name: string }[] = [];

  isError: boolean = false;

  constructor(
    private publishService: PublishService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.isRoles) {
      this.getRolesPassList();
    }

    if (this.isCategories) {
      this.getNewsCategories();
    }
    this.initForm();
  }

  get f() {
    return this.filterForm.controls;
  }

  initForm() {
    this.filterForm = this.fb.group({
      role: [this.defaultFilterValues.role],
      category: [this.defaultFilterValues.category],
      subCategory: [this.defaultFilterValues.subCategory],
      status: [this.defaultFilterValues.status],
    });
  }

  getRolesPassList(): void {
    this.isError = false;
    const getRolesPassListSubscr = this.publishService
      .getRolesPassList()
      .subscribe({
        next: (data: { id: string; name: string }[]) => {
          this.rolesPassList = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('ROLES_PASSLIST', error);
          this.isError = true;
        },
      });
    this.unsubscribe.push(getRolesPassListSubscr);
  }

  getNewsCategories(): void {
    this.isError = false;
    const getNewsCategoriesSubscr = this.dashboardService
      .getNewsCategories()
      .subscribe({
        next: (data: { categoryID: string; name: string }[]) => {
          this.newsCategories = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('NEWS_CATEGORIES', error);
          this.isError = true;
        },
      });
    this.unsubscribe.push(getNewsCategoriesSubscr);
  }

  onSelectedNewsCategoriesChange(e: any) {
    this.isError = false;

    const getNewsSubCategoriesSubscr = this.dashboardService
      .getNewsSubCategories(e.target.value)
      .pipe(distinctUntilChanged())
      .subscribe({
        next: (data: { sectionID: string; secTitle: string }[]) => {
          this.newsSubCategories = data;
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.log('NEWS_SUB_CATEGORIES', err);
          this.isError = true;
        },
      });
    this.unsubscribe.push(getNewsSubCategoriesSubscr);
  }

  onFilter() {
    this.filterOptionsEmitter.emit({
      category: this.f.category.value,
      status: this.f.status.value,
      role: this.f.role.value,
      subCategory: this.f.subCategory.value,
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
