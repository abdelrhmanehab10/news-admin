import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListOptions } from 'src/app/models/components.model';
import { UtilsService } from 'src/app/services/utils/utils.service';

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

  @Output() selectedItemsEmitter = new EventEmitter<string[]>();
  @Output() isAddedEmitter = new EventEmitter<boolean>();

  constructor(private utilsService: UtilsService) {}

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

  convertDateToArabicFormat(dateString: string) {
    return this.utilsService.convertDateToArabicFormat(dateString);
  }

  toggleSelect(e: any) {
    if (e.target.checked) {
      this.selectedItems.push(e.target.value);
    } else {
      this.selectedItems = this.selectedItems.filter(
        (id) => id != e.target.value
      );
      console.log(this.selectedItems);
    }

    this.selectedItemsEmitter.emit(this.selectedItems);
  }

  isItemChecked(id: string) {
    return this.selectedItems.some((itemId) => itemId == id);
  }

  recieveIsAdded(data: boolean) {
    this.isAddedEmitter.emit(data);
  }
}
