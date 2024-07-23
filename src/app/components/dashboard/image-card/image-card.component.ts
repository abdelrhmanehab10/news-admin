import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
})
export class ImageCardComponent {
  @Input() image: {
    icon: string;
    title: string;
    description: string;
    id: number;
    addedDate: string;
  };
  @HostBinding('class') class = 'card h-100';

  @Output() selectedImageEmitter = new EventEmitter<{
    icon: string;
    title: string;
    description: string;
    id: number;
  }>();

  constructor() {}

  onSelect() {
    this.selectedImageEmitter.emit(this.image);
  }
}
