import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
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
  drafts: {
    NewAutoSaveId: string;
    Title: string;
    SecTitle: string;
    CreatedDate: string;
  }[] = [];
  headerOptions: { checkBox: boolean; cols: string[]; actions: string[] } = {
    cols: ['العنوان', 'الوقت', 'التاريخ'],
    checkBox: false,
    actions: ['restoreDraft'],
  };

  constructor(
    private addNewService: AddNewService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getDrafts();
  }

  getDrafts() {
    this.hasError = false;
    const getDraftsSubscr = this.addNewService.getDrafts().subscribe({
      next: (data: typeof this.drafts) => {
        if (data) {
          this.drafts = data;
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
}
