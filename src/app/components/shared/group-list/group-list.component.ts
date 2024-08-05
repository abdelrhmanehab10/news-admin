import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DateTimeFormatOptions } from '@eonasdan/tempus-dominus';
import { ListOptions } from 'src/app/models/components.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
})
export class GroupListComponent {
  @Output() selectedItemsEmitter = new EventEmitter<string[]>();

  @Input() items: any[] = [];
  @Input() isLoading: boolean | null = null;
  @Input() isAllSectionSelected: boolean = false;
  @Input() groupListOptions: ListOptions;

  selectedItems: string[] = [];

  constructor() {}

  convertDateToArabicFormat(dateString: string) {
    const date = new Date(dateString);

    const options: DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    const formatter = new Intl.DateTimeFormat('ar-EG', options);
    const formattedDate = formatter.format(date);

    return formattedDate;
  }

  convertTimeToArabic12HourFormat(timeString: string) {
    const [hours, minutes] = timeString.split(':');

    let hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'م' : 'ص';

    hour = hour % 12 || 12;

    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');

    const formattedTime = `[${formattedHour}:${formattedMinutes} ${period}]`;

    return formattedTime;
  }

  toggleSelect(e: any) {
    if (e.target.checked) {
      this.selectedItems.push(e.target.value);
    } else {
      this.selectedItems = this.selectedItems.filter(
        (id) => id !== e.target.value
      );
    }

    this.selectedItemsEmitter.emit(this.selectedItems);
  }
}
