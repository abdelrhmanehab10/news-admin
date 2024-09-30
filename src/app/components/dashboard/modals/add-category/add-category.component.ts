import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { ModalComponent } from 'src/app/components/shared/modal/modal.component';
import { Category } from 'src/app/models/components.model';
import { ModalConfig } from 'src/app/models/components.model';
import { CategoryService } from 'src/app/services/dashboard/category/category.service';
import { DashboardService } from 'src/app/services/dashboard/dashboard.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
})
export class AddCategoryComponent implements OnDestroy {
  categoryForm: FormGroup;
  filterForm: FormGroup;

  private unsubscribe: Subscription[] = [];

  @ViewChild('modal') private modalComponent: ModalComponent;

  @Output() eventEmitter = new EventEmitter<boolean>();

  @Input() btnStyle: string = '';
  @Input() categoryId: string;
  @Input() type: 'add' | 'edit' = 'add';

  isLoading$: Observable<boolean>;
  newsCategories: any[] = [];

  modalConfig: ModalConfig = {
    modalTitle: this.type === 'add' ? 'أضافة باب رئيسي' : 'تعديل باب رئيسي',
    dismissButtonLabel: this.type === 'add' ? 'حفظ' : 'تعديل',
    closeButtonLabel: 'اغلاق',
    customDismiss: () => {
      if (this.type === 'add') {
        this.addCategory();
      } else {
        this.editCategory();
      }
    },
  };

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private dashboardService: DashboardService,
    private toast: ToastrService
  ) {
    this.isLoading$ = this.categoryService.isLoading$;
    this.dashboardService.categories$.subscribe((categories) => {
      this.newsCategories = categories;
    });
  }

  get f() {
    return this.categoryForm.controls;
  }

  initForm() {
    this.categoryForm = this.fb.group({
      Name: ['', Validators.required],
      SeoTitle: ['', Validators.required],
      SeoKeyWords: ['', Validators.required],
      Hide: [false],
      SeoDescription: ['', Validators.required],
    });
  }

  async openModal() {
    this.initForm();
    if (this.type === 'edit') {
      this.getCategoryById(this.categoryId);
    }
    return await this.modalComponent.open();
  }

  addCategory() {
    if (this.categoryForm.invalid) {
      return;
    }
    const addCategorySubscr = this.categoryService
      .addCategory({
        Name: this.f.Name.value,
        SeoTitle: this.f.SeoTitle.value,
        SeoKeyWords: this.f.SeoKeyWords.value,
        SeoDescription: this.f.SeoDescription.value,
        Hide: this.f.Hide.value,
      })
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data.message);
            this.eventEmitter.emit(true);
            this.modalComponent.close();
          }
        },
        error: (error: any) => {
          console.log('[ADD_CATEGORY]', error);
        },
      });
    this.unsubscribe.push(addCategorySubscr);
  }

  editCategory() {
    if (this.categoryForm.invalid) {
      return;
    }
    const editCategorySubscr = this.categoryService
      .editCategory({
        CatId: this.categoryId,
        Name: this.f.Name.value,
        SeoTitle: this.f.SeoTitle.value,
        SeoKeyWords: this.f.SeoKeyWords.value,
        SeoDescription: this.f.SeoDescription.value,
        Hide: this.f.Hide.value,
      })
      .subscribe({
        next: (data: any) => {
          if (data) {
            this.toast.success(data);
            this.eventEmitter.emit(true);
            this.modalComponent.close();
          }
        },
        error: (error: any) => {
          console.log('[EDIT_CATEGORY]', error);
        },
      });
    this.unsubscribe.push(editCategorySubscr);
  }

  getCategoryById(categoryId: string) {
    const getCategoryByIdSubscr = this.categoryService
      .getCategoryById(categoryId)
      .subscribe({
        next: (data: any) => {
          this.f.Name.setValue(data.name);
          this.f.Hide.setValue(data.hide);
          this.f.SeoDescription.setValue(data.seoDescription);
          this.f.SeoKeyWords.setValue(data.seoKeyWords);
          this.f.SeoTitle.setValue(data.seoTitle);
        },
        error: (error: any) => {
          console.log('[GET_CATEGORY_BY_ID]', error);
        },
      });
    this.unsubscribe.push(getCategoryByIdSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
