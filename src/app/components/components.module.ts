import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { TableComponent } from './shared/table/table.component';
import { KeeniconComponent } from './shared/keenicon/keenicon.component';
import { DropdownMenuComponent } from './shared/dropdown/dropdown-menu.component';
import { AddNewCardComponent } from './dashboard/add-new-card/add-new-card.component';
import { ModalComponent } from './shared/modal/modal.component';
import { Card4Component } from '../_metronic/partials/content/cards/card4/card4.component';
import { DragableListComponent } from './shared/dragable-list/dragable-list.component';
import { ListComponent } from './shared/list/list.component';
import { AddImageComponent } from './dashboard/modals/add-image/add-image.component';
import { UploadImageComponent } from './dashboard/modals/upload-image/upload-image.component';
import { AddSectionComponent } from './dashboard/modals/add-section/add-section.component';
import { ImageCardComponent } from './dashboard/image-card/image-card.component';
import { ImageComponent } from './shared/image/image.component';
import { GroupListComponent } from './shared/group-list/group-list.component';
import { AddUrgentContentComponent } from './dashboard/modals/add-urgent-new/add-urgent-content.component';
import { ChooseFromDailyNewsComponent } from './dashboard/modals/choose-from-daily-news/choose-from-daily-news.component';
import { AddVoteComponent } from './dashboard/modals/add-vote/add-vote.component';
import { DateInputComponent } from './shared/date-input/date-input.component';

@NgModule({
  declarations: [
    LoginComponent,
    TableComponent,
    KeeniconComponent,
    DropdownMenuComponent,
    AddNewCardComponent,
    ModalComponent,
    Card4Component,
    DragableListComponent,
    ListComponent,
    AddImageComponent,
    UploadImageComponent,
    AddSectionComponent,
    ImageCardComponent,
    ImageComponent,
    GroupListComponent,
    AddUrgentContentComponent,
    ChooseFromDailyNewsComponent,
    AddVoteComponent,
    DateInputComponent,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
    EditorComponent,
    NgbDatepickerModule,
  ],
  exports: [
    TableComponent,
    KeeniconComponent,
    DropdownMenuComponent,
    AddNewCardComponent,
    ModalComponent,
    Card4Component,
    DragableListComponent,
    ListComponent,
    AddImageComponent,
    UploadImageComponent,
    AddSectionComponent,
    ImageCardComponent,
    ImageComponent,
    GroupListComponent,
    AddUrgentContentComponent,
    ChooseFromDailyNewsComponent,
    AddVoteComponent,
    DateInputComponent,
  ],
})
export class ComponentsModule {}
