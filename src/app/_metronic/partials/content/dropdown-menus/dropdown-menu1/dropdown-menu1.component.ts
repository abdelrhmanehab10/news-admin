import {
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnInit,
} from '@angular/core';
import { Subscription, distinctUntilChanged, switchMap } from 'rxjs';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';

@Component({
  selector: 'app-dropdown-menu1',
  templateUrl: './dropdown-menu1.component.html',
})
export class DropdownMenu1Component implements OnInit {
  private unsubscribe: Subscription[] = [];

  @HostBinding('class') class =
    'menu menu-sub menu-sub-dropdown w-250px w-md-300px';
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  @Input() rolesPassList: { id: string; name: string }[];
  @Input() newsCategories: { categoryID: string; name: string }[];

  newsSubCategories: { sectionID: string; secTitle: string }[] = [];
  isError: boolean = false;
  constructor(
    private publishService: PublishService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {}

  onSelectedNewsCategoriesChange(e: any) {
    this.isError = false;

    const getNewsSubCategoriesSubscr = this.publishService
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

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
