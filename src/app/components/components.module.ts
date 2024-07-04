import { NgModule } from '@angular/core';
import { TablesWidget9Component } from './shared/table/tables-widget9.component';
import { KeeniconComponent } from './shared/keenicon/keenicon.component';
import { DropdownMenu1Component } from './shared/dropdown/dropdown-menu1.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddNewCardComponent } from './dashboard/add-new-card/add-new-card.component';
import { CKEditorModule } from 'ckeditor4-angular';
import { ModalComponent } from './shared/modal/modal.component';
import { AddImageComponent } from './dashboard/modals/add-image/add-image.component';
import { Card4Component } from '../_metronic/partials/content/cards/card4/card4.component';

@NgModule({
  declarations: [
    TablesWidget9Component,
    KeeniconComponent,
    DropdownMenu1Component,
    AddNewCardComponent,
    ModalComponent,
    AddImageComponent,
    Card4Component,
  ],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, CKEditorModule],
  exports: [
    TablesWidget9Component,
    KeeniconComponent,
    DropdownMenu1Component,
    AddNewCardComponent,
    ModalComponent,
    AddImageComponent,
    Card4Component,
  ],
})
export class ComponentsModule {}
