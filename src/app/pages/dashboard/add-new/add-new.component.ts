import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AddNewService } from 'src/app/services/dashboard/add-new/add-new.service';

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.component.html',
  styleUrl: './add-new.component.scss',
})
export class AddNewComponent implements OnInit {
  private unsubscribe: Subscription[] = [];

  hasError: boolean = false;
  drafts: any[] = [];
  headerOptions: {
    checkBox: boolean;
    cols: string[];
    actions: string[];
    search: boolean;
  } = {
    cols: ['title', 'dateWithTime'],
    checkBox: false,
    actions: ['restoreDraft'],
    search: false,
  };

  customBtnsOptions: {
    content: string;
    onClick: () => void;
    bgColor: string;
  }[] = [
    { content: 'حذف الكل', bgColor: 'danger', onClick: this.deleteAllDrafts },
  ];

  constructor(
    private addNewService: AddNewService,
    private cdr: ChangeDetectorRef,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.getDrafts();
  }

  getDrafts() {
    this.hasError = false;
    const getDraftsSubscr = this.addNewService.getDrafts().subscribe({
      next: (data: typeof this.drafts) => {
        if (data) {
          const items = data.map((item) => ({
            title: item.title,
            category: item.secTitle,
            dateWithTime: item.createdDate,
          }));
          this.drafts = items;
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[DRAFTS]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getDraftsSubscr);
  }

  deleteAllDrafts() {
    this.hasError = false;
    const getDraftsSubscr = this.addNewService.deleteAllDrafts().subscribe({
      next: (data: any) => {
        if (data) {
          this.toast.error(data.message);
          this.cdr.detectChanges();
        }
      },
      error: (error: any) => {
        console.log('[DELETE_DRAFTS]', error);
        this.hasError = true;
      },
    });
    this.unsubscribe.push(getDraftsSubscr);
  }
}
