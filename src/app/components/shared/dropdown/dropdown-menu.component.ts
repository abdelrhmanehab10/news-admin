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
import { Subscription, distinctUntilChanged } from 'rxjs';
import { FilterOption } from 'src/app/models/components.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';
import { LayoutService } from 'src/app/services/layout/layout.service';

@Component({
  selector: 'app-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
})
export class DropdownMenuComponent implements OnInit, OnDestroy {
  defaultFilterValues: {
    role: string;
    category: string;
    orderCategory: string;
    subCategory: string;
    orderSubCategory: string;
    status: string;
    type: string;
  } = {
    role: '',
    category: '',
    orderCategory: '',
    subCategory: '',
    orderSubCategory: '',
    status: '',
    type: '',
  };

  private unsubscribe: Subscription[] = [];

  filterForm: FormGroup;

  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  @Output() filterOptionsEmitter = new EventEmitter<FilterOption>();

  //Filtration Methods
  @Input() filterOptions: FilterOption;

  rolesPassList: { id: string; name: string }[];
  categories: { categoryID: string; name: string }[] = [];
  newsOrderCategories: { id: string; name: string }[] = [];
  newsSubCategories: { sectionID: string; secTitle: string }[] = [];
  newsOrderSubCategories: { sectionID: string; secTitle: string }[] = [];
  newsStatus: { roleId: string; roleName: string }[] = [];

  isError: boolean = false;

  constructor(
    private publishService: PublishService,
    private dashboardService: DashboardService,
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.filterOptions.isRoles) {
      this.getRolesPassList();
    }

    if (this.filterOptions.isCategories) {
      this.dashboardService.categories$.subscribe((categories) => {
        this.categories = categories;
      });
    }

    if (this.filterOptions.isOrderCategories) {
      this.getNewsOrderCategories();
    }

    if (this.filterOptions.isStatus) {
      this.layoutService.newsStatusCount$.subscribe((newsStatus) => {
        this.newsStatus = newsStatus;
      });
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
      orderCategory: [this.defaultFilterValues.orderCategory],
      subCategory: [this.defaultFilterValues.subCategory],
      orderSubCategory: [this.defaultFilterValues.orderSubCategory],
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

  getNewsOrderCategories(): void {
    this.isError = false;
    const getNewsOrderCategoriesSubscr = this.dashboardService
      .getNewsOrderCategories()
      .subscribe({
        next: (data: typeof this.newsOrderCategories) => {
          this.newsOrderCategories = data;
          this.cdr.detectChanges();
        },
        error: (error: any) => {
          console.log('NEWS_ORDER_CATEGORIES', error);
          this.isError = true;
        },
      });
    this.unsubscribe.push(getNewsOrderCategoriesSubscr);
  }

  onSelectedNewsOrderCategoriesChange(e: any) {
    this.isError = false;

    const getNewsSubCategoriesSubscr = this.dashboardService
      .getNewsOrderSubCategories(e.target.value)
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
      isCategories: this.filterOptions.isCategories,
      categoryId: this.f.category.value,
      statusId: this.f.status.value,
      roleId: this.f.role.value,
      subCategoryId: this.f.subCategory.value,
      orderCategoryId: this.f.orderCategory.value,
      orderSubCategoryId: this.f.orderSubCategory.value,
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
