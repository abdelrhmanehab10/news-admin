import { NgModule } from '@angular/core';
import { TableComponent } from './shared/table/table.component';
import { KeeniconComponent } from './shared/keenicon/keenicon.component';
import { DropdownMenu1Component } from './shared/dropdown/dropdown-menu1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddNewCardComponent } from './dashboard/add-new-card/add-new-card.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ModalComponent } from './shared/modal/modal.component';
import { AddImageComponent } from './dashboard/modals/add-image/add-image.component';
import { Card4Component } from '../_metronic/partials/content/cards/card4/card4.component';
import { ListComponent } from './shared/list/list.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { UploadImageComponent } from './dashboard/modals/upload-image/upload-image.component';
import { EditorComponent } from '@tinymce/tinymce-angular';

@NgModule({
  declarations: [
    TableComponent,
    KeeniconComponent,
    DropdownMenu1Component,
    AddNewCardComponent,
    ModalComponent,
    Card4Component,
    ListComponent,
    AddImageComponent,
    UploadImageComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CKEditorModule,
    DragDropModule,
    EditorComponent,
  ],
  exports: [
    TableComponent,
    KeeniconComponent,
    DropdownMenu1Component,
    AddNewCardComponent,
    ModalComponent,
    Card4Component,
    ListComponent,
    AddImageComponent,
    UploadImageComponent,
  ],
})
export class ComponentsModule {}
