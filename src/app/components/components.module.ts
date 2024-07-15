import { NgModule } from '@angular/core';
import { TableComponent } from './shared/table/table.component';
import { KeeniconComponent } from './shared/keenicon/keenicon.component';
import { DropdownMenu1Component } from './shared/dropdown/dropdown-menu1.component';
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
import { AddSectionComponent } from './dashboard/modals/add-section/add-section.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { CardComponent } from './shared/card/card.component';
import { ImageComponent } from './shared/image/image.component';

@NgModule({
  declarations: [
    LoginComponent,
    TableComponent,
    KeeniconComponent,
    DropdownMenu1Component,
    AddNewCardComponent,
    ModalComponent,
    Card4Component,
    ListComponent,
    AddImageComponent,
    UploadImageComponent,
    AddSectionComponent,
    CardComponent,
    ImageComponent,
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
    AddSectionComponent,
    CardComponent,
    ImageComponent,
  ],
})
export class ComponentsModule {}
