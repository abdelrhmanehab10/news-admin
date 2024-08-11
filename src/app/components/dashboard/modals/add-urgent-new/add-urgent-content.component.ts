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
import { ModalConfig } from 'src/app/models/components.model';
import { UrgentNewsService } from 'src/app/services/dashboard/urgent-news/urgent-news.service';

@Component({
  selector: 'app-add-urgent-new',
  templateUrl: './add-urgent-content.component.html',
  styleUrl: './add-urgent-content.component.scss',
})
export class AddUrgentContentComponent implements OnInit {
  defaultUrgentContent: {
    Title: string;
    isUrgentNew: boolean;
  } = {
    Title: '',
    isUrgentNew: false,
  };

  urgentContentForm: FormGroup;

  private unsubscribe: Subscription[] = [];

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() onNewUrgentContentAddedEmitter = new EventEmitter<boolean>();

  hasError: boolean = false;

  isLoading$: Observable<boolean>;

  modalConfig: ModalConfig = {
    modalTitle: 'أضافة محتوي عاجل',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'اغلاق',
    customDismiss: () => {
      if (!this.urgentContentForm.invalid) {
        // this.addUrgentContent();
        this.modalComponent.close();
      }
    },
  };

  constructor(
    private fb: FormBuilder,
    private urgentNewsService: UrgentNewsService,
    private toast: ToastrService
  ) {
    this.isLoading$ = this.urgentNewsService.isLoading$;
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.urgentContentForm.controls;
  }

  initForm() {
    this.urgentContentForm = this.fb.group({
      Title: [this.defaultUrgentContent.Title, Validators.required],
      isUrgentNew: [this.defaultUrgentContent.isUrgentNew],
    });
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  // addUrgentContent() {
  //   this.hasError = false;
  //   this.onNewUrgentContentAddedEmitter.emit(false);
  //   const addUrgentContentSubscr = this.urgentNewsService
  //     .addUrgentContent({
  //       Title: this.f.Title.value,
  //       isUrgentNew: this.f.isUrgentNew.value,
  //     })
  //     .subscribe({
  //       next: (data: any) => {
  //         if (data) {
  //           this.toast.success(data.message);
  //           this.onNewUrgentContentAddedEmitter.emit(true);
  //         }
  //       },
  //       error: (error: any) => {
  //         console.log('[ADD_URGENT_CONTENT]', error);
  //         this.hasError = true;
  //       },
  //     });
  //   this.unsubscribe.push(addUrgentContentSubscr);
  // }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
