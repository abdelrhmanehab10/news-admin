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
import { ModalConfig } from 'src/app/models/modal.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SectionsService } from 'src/app/services/dashboard/sections/sections.service';

@Component({
  selector: 'app-add-vote',
  templateUrl: './add-vote.component.html',
  styleUrl: './add-vote.component.scss',
})
export class AddVoteComponent implements OnInit {
  model: NgbDateStruct;

  defaultSection: {
    sectionId: number | null;
    pollBody: string;
    voteOptions: string[];
    // startDate: Date | null;
    // endDate: Date | null;
  } = {
    sectionId: null,
    pollBody: '',
    voteOptions: [],
    // startDate: Date(),
  };

  voteForm: FormGroup;
  filterForm: FormGroup;

  private unsubscribe: Subscription[] = [];

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() onNewSectionAddedEmitter = new EventEmitter<boolean>();

  @Input() title: string = 'أضافة باب فرعي';
  @Input() btnStyle: string = '';
  hasError: boolean = false;

  isLoading$: Observable<boolean>;
  newsCategories: any[] = [];

  modalConfig: ModalConfig = {
    modalTitle: 'أضافة باب فرعي',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'اغلاق',
    customDismiss: () => {
      if (!this.voteForm.invalid) {
        this.addMainSection();
        this.modalComponent.close();
      }
    },
  };

  constructor(
    private fb: FormBuilder,
    private sectionsService: SectionsService,
    private dashboardService: DashboardService,
    private toast: ToastrService
  ) {
    this.isLoading$ = this.sectionsService.isLoading$;
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
      sectionId: [this.defaultSection.sectionId, Validators.required],
      pollBody: [this.defaultSection.pollBody, Validators.required],
      voteOptions: this.fb.array([
        this.fb.control('', Validators.required),
        this.fb.control('', Validators.required),
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
    this.voteOptions.push(this.fb.control('', Validators.required));
  }

  removeVoteOption(index: number): void {
    this.voteOptions.removeAt(index);
  }

  addMainSection() {
    this.hasError = false;
    this.onNewSectionAddedEmitter.emit(false);
    const addMainSectionSubscr = this.sectionsService
      .addMainSection({})
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.message);
            this.onNewSectionAddedEmitter.emit(true);
          }
        },
        error: (error: any) => {
          console.log('[ADD_MAIN_SECTION]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(addMainSectionSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
