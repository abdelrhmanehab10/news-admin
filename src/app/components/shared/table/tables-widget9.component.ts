import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  @Output() selectedNewsEmitter = new EventEmitter<string[]>();
  @Output() searchEmitter = new EventEmitter<string>();
  @Output() pageNumberEmitter = new EventEmitter<number>();

  @Input() news: NEW[];
  @Input() publish: () => void;
  @Input() restore: () => void;
  @Input() deleteNew: (id: string) => void;

  @Input() isCategories: boolean = false;
  @Input() isSubCategories: boolean = false;
  @Input() isRolesPassList: boolean = false;
  @Input() isNewsStatusCount: boolean = false;

  hasError: boolean = false;

  selectedNews: string[] = [];
  searchQuery: string = '';
  pageNumber: number = 1;

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

  onSelect(e: any) {
    this.selectedNews.push(e.target.id);
    this.selectedNewsEmitter.emit(this.selectedNews);
  }

  onSearch(e: any) {
    this.searchQuery = e.target.value;
    this.searchEmitter.emit(this.searchQuery);
  }

  onPageChange(e: any) {
    if (e.target.classList.includes('next')) {
      this.pageNumber++;
    } else if (e.target.classList.includes('previous')) {
      this.pageNumber--;
    } else {
      this.pageNumber = e.target.value;
    }
    this.pageNumberEmitter.emit(this.pageNumber);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
