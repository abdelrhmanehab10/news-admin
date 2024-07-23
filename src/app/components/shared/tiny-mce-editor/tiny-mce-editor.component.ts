import { Component, EventEmitter, Output } from '@angular/core';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-tiny-mce-editor',
  templateUrl: './tiny-mce-editor.component.html',
})
export class TinyMCEEditorComponent {
  Story: string = '';

  @Output() storyEmitter = new EventEmitter<string>();

  init: EditorComponent['init'] = {
    plugins: 'lists link image table code help wordcount',
    directionality: 'rtl',
    language: 'ar',
  };

  modelChangeFn(e: any) {
    this.Story = e;
    this.storyEmitter.emit(e);
  }
}
