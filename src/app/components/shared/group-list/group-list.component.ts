import { Component, Input } from '@angular/core';
import { DateTimeFormatOptions } from '@eonasdan/tempus-dominus';
import { ListOptions } from 'src/app/models/components.model';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
})
export class GroupListComponent {
  @Input() items: any[] = [];
  @Input() isLoading: boolean | null = null;
  @Input() groupListOptions: ListOptions;

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
}
