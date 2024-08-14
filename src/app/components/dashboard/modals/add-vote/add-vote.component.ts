import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { ModalConfig } from 'src/app/models/components.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { VoteService } from 'src/app/services/dashboard/vote/vote.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-add-vote',
  templateUrl: './add-vote.component.html',
  styleUrl: './add-vote.component.scss',
})
export class AddVoteComponent implements OnInit {
  model: NgbDateStruct;

  voteForm: FormGroup;
  filterForm: FormGroup;

  private unsubscribe: Subscription[] = [];

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() onNewSectionAddedEmitter = new EventEmitter<boolean>();

  @Input() title: string = 'أضافة باب فرعي';
  @Input() btnStyle: string = '';
  hasError: boolean = false;
  submitted: boolean = false;

  isLoading$: Observable<boolean>;
  newsCategories: any[] = [];
  startDate: string;
  endDate: string;
  modalConfig: ModalConfig = {
    modalTitle: 'أضافة باب فرعي',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'اغلاق',
    customDismiss: () => {
      this.addVote();
    },
  };

  constructor(
    private fb: FormBuilder,
    private voteService: VoteService,
    private utilsService: UtilsService,
    private dashboardService: DashboardService,
    private toast: ToastrService
  ) {
    this.isLoading$ = this.voteService.isLoading$;
    this.dashboardService.categories$.subscribe((categories) => {
      this.newsCategories = categories;
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  get f() {
    return this.voteForm.controls;
  }

  initForm() {
    this.voteForm = this.fb.group({
      sectionId: ['', [Validators.required]],
      pollBody: ['', [Validators.required]],
      voteOptions: this.fb.array([
        this.fb.control('', [Validators.required]),
        this.fb.control('', [Validators.required]),
      ]),
    });
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  get voteOptions(): FormArray {
    return this.voteForm.get('voteOptions') as FormArray;
  }

  addVoteOption(): void {
    this.voteOptions.push(this.fb.control('', [Validators.required]));
  }

  removeVoteOption(index: number): void {
    this.voteOptions.removeAt(index);
  }

  addVote() {
    this.hasError = false;
    this.submitted = true;
    if (this.voteForm.invalid) {
      this.utilsService.scrollToFirstInvalidControl('addVote');
      return;
    }
    this.onNewSectionAddedEmitter.emit(false);
    const addVoteSubscr = this.voteService
      .addVote({
        sectionId: this.f.sectionId.value,
        pollBody: this.f.pollBody.value,
        startDate: this.startDate,
        endDate: this.endDate,
        voteOptions: this.voteOptions.controls.map((control) => control.value),
      })
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.message);
            this.onNewSectionAddedEmitter.emit(true);
            this.modalComponent.close();
          } else {
            this.toast.error('يوجد خطأ ف البيانات');
          }
          this.submitted = false;
        },
        error: (error: any) => {
          console.log('[ADD_VOTE]', error);
          this.submitted = false;
          this.hasError = true;
        },
      });
    this.unsubscribe.push(addVoteSubscr);
  }

  recieveStartDate(date: any) {
    this.startDate = date;
  }

  recieveEndDate(date: any) {
    this.endDate = date;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
