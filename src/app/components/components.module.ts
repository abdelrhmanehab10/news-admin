import { forwardRef, NgModule } from '@angular/core';

import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './auth/login/login.component';
import { TableComponent } from './shared/table/table.component';
import { KeeniconComponent } from './shared/keenicon/keenicon.component';
import { DropdownMenuComponent } from './shared/dropdown/dropdown-menu.component';
import { ModalComponent } from './shared/modal/modal.component';
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
import { PaginationComponent } from './shared/pagination/pagination.component';
import { AddEditorComponent } from './dashboard/modals/add-editor/add-editor.component';
import { TagsInputComponent } from './shared/tags-input/tags-input.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { DateTimePickerComponent } from './shared/date-time-input/date-time-picker.component';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { AddArticleComponent } from './dashboard/modals/add-article/add-article.component';
import { DraftsComponent } from './dashboard/drafts/drafts.component';
import { AddCategoryComponent } from './dashboard/modals/add-category/add-category.component';
import { ThemeModeSwitcherComponent } from './layout/theme-mode-switcher/theme-mode-switcher.component';
import { LayoutScrollTopComponent } from './layout/scroll-top/scroll-top.component';
import { LayoutModule } from './layout/layout.module';
import { StatsComponent } from './shared/stats/stats.component';
import { InlineSVGModule } from 'ng-inline-svg-2';

@NgModule({
  declarations: [
    LoginComponent,
    TableComponent,
    DropdownMenuComponent,
    ModalComponent,
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
    PaginationComponent,
    AddEditorComponent,
    TagsInputComponent,
    DateTimePickerComponent,
    AddArticleComponent,
    DraftsComponent,
    AddCategoryComponent,
  ],
  imports: [
    ImageCropperComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgbDatepickerModule,
    LayoutModule,
  ],
  exports: [
    TableComponent,
    DropdownMenuComponent,
    ModalComponent,
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
    PaginationComponent,
    AddEditorComponent,
    TagsInputComponent,
    DateTimePickerComponent,
    AddArticleComponent,
    DraftsComponent,
    AddCategoryComponent,
  ],
  providers: [
    DatePipe,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    },
  ],
})
export class ComponentsModule {}
