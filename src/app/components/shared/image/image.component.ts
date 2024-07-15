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
  @Input() selectedImage?: {
    icon: string;
    title: string;
    description: string;
  } | null;

  @Output() isSelectedImageRemovedEmitter = new EventEmitter<boolean>();

  selectedFile: File | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.previewFile(this.selectedFile);
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
    this.selectedFile = null;
    this.selectedImage = null;
    this.isSelectedImageRemovedEmitter.emit(true);
    this.filePreview = null;
    this.cdr.detectChanges();
  }
}
