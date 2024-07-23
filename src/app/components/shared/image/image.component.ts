import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrl: './image.component.scss',
})
export class ImageComponent {
  filePreview: string | ArrayBuffer | null | undefined = null;
  @Input() selectedImage: any;

  @Input() formControlName: string = '';

  @Output() selectedImageEmitter = new EventEmitter<any>();

  constructor(private cdr: ChangeDetectorRef) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      this.selectedImageEmitter.emit(input.files[0]);
      this.previewFile(this.selectedImage);
      this.cdr.detectChanges();
    }
  }

  previewFile(file: File): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.filePreview = e.target?.result;
      this.cdr.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  removeSelectedImg() {
    this.selectedImage = null;
    this.selectedImageEmitter.emit(null);
    this.filePreview = null;
    this.cdr.detectChanges();
  }
}
