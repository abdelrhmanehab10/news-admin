import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-dropdown-menu1',
  templateUrl: './dropdown-menu1.component.html',
})
export class DropdownMenu1Component implements OnInit {
  private unsubscribe: Subscription[] = [];

  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  @Output() filterOptionsEmitter = new EventEmitter<{}>();

  //Filtration Methods
  @Input() isRolesPassList: boolean = false;
  @Input() isCategories: boolean = false;
  @Input() isSubCategories: boolean = false;
  @Input() isNewsStatus: boolean = false;

  rolesPassList: { id: string; name: string }[];
  newsCategories: { categoryID: string; name: string }[] = [];
  newsSubCategories: { sectionID: string; secTitle: string }[] = [];
  newsStatus: { id: string; name: string }[] = [];

  isError: boolean = false;

  constructor(
    private publishService: PublishService,
    private dashboardService: DashboardService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (this.isRolesPassList) {
      this.getRolesPassList();
    }

    if (this.isCategories) {
      this.getNewsCategories();
    }
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
          console.log(data);

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

  onFilter() {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
