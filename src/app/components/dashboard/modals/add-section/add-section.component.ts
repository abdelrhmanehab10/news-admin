import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Observable, Subscription, distinctUntilChanged } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { Section } from 'src/app/models/components.model';
import { ModalConfig } from 'src/app/models/modal.model';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';
import { SectionsService } from 'src/app/services/dashboard/sections/sections.service';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrl: './add-section.component.scss',
})
export class AddSectionComponent implements OnInit {
  sectionForm: FormGroup;
  filterForm: FormGroup;

  private unsubscribe: Subscription[] = [];

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() onNewSectionAddedEmitter = new EventEmitter<boolean>();

  @Input() title: string = 'أضافة باب فرعي';
  @Input() btnStyle: string = '';
  @Input() section: Section = {
    SecTitle: '',
    Hide: false,
    WeeklySection: false,
    Keywords: '',
    Description: '',
    SectionId: null,
  };

  hasError: boolean = false;

  isLoading$: Observable<boolean>;
  newsCategories: any[] = [];

  modalConfig: ModalConfig = {
    modalTitle: 'أضافة باب فرعي',
    dismissButtonLabel: 'حفظ',
    closeButtonLabel: 'اغلاق',
    customDismiss: () => {
      if (!this.sectionForm.invalid) {
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
    return this.sectionForm.controls;
  }

  initForm() {
    this.sectionForm = this.fb.group({
      Description: ['', Validators.required],
      CategoryId: ['', Validators.required],
      Keywords: ['', Validators.required],
      SecTitle: ['', Validators.required],
      Hide: [false],
      WeeklySection: [false],
    });
  }

  onOpen() {
    this.openModal();
  }

  async openModal() {
    return await this.modalComponent.open();
  }

  addMainSection() {
    this.hasError = false;
    this.onNewSectionAddedEmitter.emit(false);
    const addMainSectionSubscr = this.sectionsService
      .addMainSection({
        Description: this.f.Description.value,
        Keywords: this.f.Keywords.value,
        CategoryId: this.f.CategoryId.value,
        SecTitle: this.f.SecTitle.value,
        Hide: this.f.Hide.value,
        WeeklySection: this.f.WeeklySection.value,
      })
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
