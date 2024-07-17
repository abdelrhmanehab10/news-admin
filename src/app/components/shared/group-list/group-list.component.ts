import { Component, Input } from '@angular/core';
import { DateTimeFormatOptions } from '@eonasdan/tempus-dominus';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
})
export class GroupListComponent {
  @Input() items: any[] = [];
  @Input() isLoading: boolean | null = null;

  
  constructor() {}

  convertDateToArabicFormat(dateString: string) {
    // Create a new Date object from the input date string
    const date = new Date(dateString);

    // Define Arabic locale options for formatting the date
    const options: DateTimeFormatOptions = {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    };

    // Format the date using Intl.DateTimeFormat with Arabic locale
    const formatter = new Intl.DateTimeFormat('ar-EG', options);
    const formattedDate = formatter.format(date);

    // Return the formatted date
    return formattedDate;
  }

  convertTimeToArabic12HourFormat(timeString: string) {
    // Extract the hours and minutes from the time string
    const [hours, minutes] = timeString.split(':');

    // Convert hours to a number and determine if it's AM or PM
    let hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'م' : 'ص';

    // Adjust hours to 12-hour format
    hour = hour % 12 || 12; // Convert '0' or '12' to '12', '13' to '1', etc.

    // Add leading zeros if necessary
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinutes = minutes.padStart(2, '0');

    // Format the time string as [HH:MM ص/م]
    const formattedTime = `[${formattedHour}:${formattedMinutes} ${period}]`;

    return formattedTime;
  }
}
