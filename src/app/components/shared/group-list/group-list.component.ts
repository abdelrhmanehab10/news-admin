import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DateTimeFormatOptions } from '@eonasdan/tempus-dominus';
import { ListOptions } from 'src/app/models/components.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
})
export class GroupListComponent {
  @Input() items: any[] = [];
  @Input() isLoading: boolean | null = null;
  @Input() groupListOptions: ListOptions;

  @Input() selectedItems: string[] = [];

  @Output() selectedItemsChange = new EventEmitter<string[]>();

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
      if (!this.selectedItems.some((si) => si == e.target.value)) {
        this.selectedItems.push(e.target.value);
      }
    } else {
      this.selectedItems = this.selectedItems.filter(
        (id) => id != e.target.value
      );
    }

    this.selectedItemsChange.emit(this.selectedItems);
  }

  isSelected(id: string) {
    return this.selectedItems.find((si) => si === id);
  }
}
