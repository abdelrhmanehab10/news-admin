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
  @Input() icon: string = '';
  @Input() title: string = '';
  @Input() description: string = '';
  @HostBinding('class') class = 'card h-100';

  @Output() selectedImageEmitter = new EventEmitter<{
    icon: string;
    title: string;
    description: string;
  }>();

  constructor() {}

  onSelect() {
    this.selectedImageEmitter.emit({
      icon: this.icon,
      title: this.title,
      description: this.description,
    });
  }
}
