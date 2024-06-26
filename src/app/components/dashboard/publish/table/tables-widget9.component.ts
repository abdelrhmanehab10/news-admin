import { Component, Input } from '@angular/core';
import { Toast } from 'bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { NEW } from 'src/app/models/new.model';
import { PublishService } from 'src/app/services/dashboard/publish/publish.service';

@Component({
  selector: 'app-tables-widget9',
  templateUrl: './tables-widget9.component.html',
})
export class TablesWidget9Component {
  private unsubscribe: Subscription[] = [];

  @Input() news: NEW[];
  @Input() rolesPassList: { id: string; name: string }[];
  @Input() newsCategories: { categoryID: string; name: string }[];
  @Input() newsSubCategories: { id: string; name: string }[];

  hasError: boolean = false;
  selectedNews: string[] = [];
  constructor(
    private publishService: PublishService,
    private toastr: ToastrService
  ) {}

  convertToArabicTime(time: any) {
    let [hours, minutes] = time.split(':').map(Number);

    let suffix = hours < 12 ? 'ص' : 'م';
    hours = hours % 12 || 12;

    hours = String(hours).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    return `${hours}:${minutes} ${suffix}`;
  }

  convertToFullDate(dateTime: string) {
    const date = new Date(dateTime);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/200${year}`;
  }

  publish() {
    //publish new logic
  }

  restore() {
    //restore new
  }

  deleteNew(id?: string) {
    this.hasError = false;
    if (id) {
      this.selectedNews.push(id);
    }

    const deleteNewSubscr = this.publishService
      .deleteNew(this.selectedNews)
      .subscribe({
        next: (data: string) => {
          this.toastr.error(data);
        },
        error: (error: any) => {
          console.log('[DELETE]', error);
          this.hasError = true;
        },
      });
    this.unsubscribe.push(deleteNewSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
