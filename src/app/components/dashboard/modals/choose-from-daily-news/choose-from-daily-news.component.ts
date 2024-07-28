import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { FilterOption } from 'src/app/models/components.model';
import { ModalConfig } from 'src/app/models/modal.model';
import { UrgentNewsService } from 'src/app/services/dashboard/urgent-news/urgent-news.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-choose-from-daily-news',
  templateUrl: './choose-from-daily-news.component.html',
  styleUrl: './choose-from-daily-news.component.scss',
})
export class ChooseFromDailyNewsComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() onUrgentNewsChoosedFromDailyNewsEmitter =
    new EventEmitter<boolean>();
  items: any[] = [];
  selectedItems: string[] = [];

  filterOptions: FilterOption = {
    isCategories: true,
  };

  hasError: boolean = false;
  isLoading$: Observable<boolean>;

  modalConfig: ModalConfig = {
    modalTitle: 'أضافة خبر عاجل من المحتويات اليومية',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'اغلاق',
    // customDismiss: () => {
    //   this.addUrgentNewsFromDailyNews();
    //   this.modalComponent.close();
    // },
  };

  constructor(
    private urgentNewsService: UrgentNewsService,
    private toast: ToastrService,
    private utilsService: UtilsService
  ) {
    this.isLoading$ = this.urgentNewsService.isLoading$;
  }

  ngOnInit(): void {}

  async openModal() {
    return await this.modalComponent.open();
  }

  toggleSelectAll(e: any) {
    this.selectedItems = this.utilsService.toggleSelectAll(e, this.items);
  }

  getDailyNews() {
    this.hasError = false;
    this.onUrgentNewsChoosedFromDailyNewsEmitter.emit(false);
    const addUrgentContentSubscr = this.urgentNewsService
      .addUrgentContent()
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.message);
            this.onUrgentNewsChoosedFromDailyNewsEmitter.emit(true);
          }
        },
        error: (error: any) => {
          console.log('[ADD_URGENT_NEWS_FROM_DAILY]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(addUrgentContentSubscr);
  }

  // addUrgentNewsFromDailyNews() {
  //   this.hasError = false;
  //   this.onUrgentNewsChoosedFromDailyNewsEmitter.emit(false);
  //   const addUrgentContentSubscr = this.urgentNewsService
  //     .addUrgentContent()
  //     .subscribe({
  //       next: (data: any) => {
  //         if (data) {
  //           this.toast.success(data.message);
  //           this.onUrgentNewsChoosedFromDailyNewsEmitter.emit(true);
  //         }
  //       },
  //       error: (error: any) => {
  //         console.log('[ADD_URGENT_NEWS_FROM_DAILY]', error);
  //         this.hasError = true;
  //       },
  //     });
  //   this.unsubscribe.push(addUrgentContentSubscr);
  // }

  // toggleSelectAll(e: any) {
  //   if (e.target.checked) {
  //     this.selectedItems = this.items.map((item) => String(item.sectionId));
  //   } else {
  //     this.selectedItems = [];
  //   }
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
