import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CKEditor4 } from 'ckeditor4-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';

@Component({
  selector: 'app-add-new-card',
  templateUrl: './add-new-card.component.html',
})
export class AddNewCardComponent implements OnInit, OnDestroy {
  defaultNew: { contentType: string } = {
    contentType: '1',
  };
  addNewForm: FormGroup;

  private unsubscribe: Subscription[] = [];
  isLoading$: Observable<boolean>;

  contentTypes: { typeId: string; contentType1: string }[] = [];

  editorData = '<p>Hello, world!</p>';

  hasError: boolean = false;

  constructor(
    private addNewService: AddNewService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.addNewService.isLoading$;
  }

  public onChange(event: CKEditor4.EventInfo) {
    this.editorData = event.editor.getData();
    console.log(this.editorData);
  }

  ngOnInit(): void {
    this.getContentTypes();
    this.initForm();
  }

  getContentTypes() {
    this.hasError = false;
    const getContentTypesSubscr = this.addNewService
      .getContentTypes()
      .subscribe({
        next: (data: typeof this.contentTypes) => {
          if (data) {
            this.contentTypes = data;
            this.cdr.detectChanges();
          }
        },
        error: (error: any) => {
          console.log('[CONTENT_TYPES]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(getContentTypesSubscr);
  }

  get f() {
    return this.addNewForm.controls;
  }

  initForm() {
    this.addNewForm = this.fb.group({
      contentType: [this.defaultNew.contentType],
    });
  }

  onSaveNew() {}

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
