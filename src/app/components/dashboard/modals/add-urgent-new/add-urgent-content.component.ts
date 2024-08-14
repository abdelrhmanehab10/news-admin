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
  urgentContentForm: FormGroup;

  private unsubscribe: Subscription[] = [];

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() onNewUrgentContentAddedEmitter = new EventEmitter<boolean>();

  hasError: boolean = false;
  submitted: boolean = false;

  isLoading$: Observable<boolean>;

  modalConfig: ModalConfig = {
    modalTitle: 'أضافة محتوي عاجل',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'اغلاق',
    customDismiss: () => {
      this.addUrgentContentWithTitle();
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
      Title: ['', [Validators.required]],
      isUrgentNew: [false],
    });
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  addUrgentContentWithTitle() {
    this.hasError = false;
    this.submitted = true;
    this.onNewUrgentContentAddedEmitter.emit(false);
    const addUrgentContentSubscr = this.urgentNewsService
      .addUrgentContentWithTitle(this.f.Title.value, this.f.isUrgentNew.value)
      .subscribe({
        next: (data: { status: number; message: string }) => {
          if (data.status === 200) {
            this.toast.success(data.message);
            this.onNewUrgentContentAddedEmitter.emit(true);
            this.modalComponent.close();
            this.submitted = false;
          }
        },
        error: (error: any) => {
          console.log('[ADD_URGENT_CONTENT]', error);
          this.hasError = true;
          this.submitted = false;
        },
      });
    this.unsubscribe.push(addUrgentContentSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
