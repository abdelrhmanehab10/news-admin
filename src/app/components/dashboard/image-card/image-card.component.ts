import {
  Component,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { GalleryImage } from 'src/app/models/components.model';
import { UtilsService } from 'src/app/services/utils/utils.service';
@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
})
export class ImageCardComponent {
  imageLoaded: boolean = false;

  @Input() type: 'upload' | 'link' = 'upload';
  @Input() image: GalleryImage;
  @HostBinding('class') class = 'card h-100';

  @Output() selectedImageEmitter = new EventEmitter<{
    icon: string;
    title: string;
    description: string;
    id: number;
  }>();

  constructor(private utilsService: UtilsService) {}

  timeSince(date: string) {
    return this.utilsService.timeSinceInArabic(date);
  }

  onImageLoad() {
    console.log('Hello');

    this.imageLoaded = true;
  }

  onSelect() {
    this.selectedImageEmitter.emit(this.image);
  }
}
