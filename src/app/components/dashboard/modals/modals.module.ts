import { NgModule } from '@angular/core';
import { AddArticleComponent } from './add-article/add-article.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddEditorComponent } from './add-editor/add-editor.component';
import { AddImageComponent } from './add-image/add-image.component';
import { AddSectionComponent } from './add-section/add-section.component';
import { AddUrgentContentComponent } from './add-urgent-new/add-urgent-content.component';
import { AddVoteComponent } from './add-vote/add-vote.component';
import { ChooseFromDailyNewsComponent } from './choose-from-daily-news/choose-from-daily-news.component';
import { CompareVersionsComponent } from './compare-versions/compare-versions.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { VoteResultComponent } from './vote-result/vote-result.component';
import { ModalComponent } from '../../shared/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { KeeniconComponent } from '../../shared/keenicon/keenicon.component';
import { ImageComponent } from '../../shared/image/image.component';
import { ImageCardComponent } from '../image-card/image-card.component';
import { DateTimePickerComponent } from '../../shared/date-time-input/date-time-picker.component';
import { GroupListComponent } from '../../shared/group-list/group-list.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { RouterModule } from '@angular/router';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';

@NgModule({
  declarations: [
    AddArticleComponent,
    AddCategoryComponent,
    AddEditorComponent,
    AddImageComponent,
    AddSectionComponent,
    AddUrgentContentComponent,
    AddVoteComponent,
    ChooseFromDailyNewsComponent,
    CompareVersionsComponent,
    UploadImageComponent,
    VoteResultComponent,

    ModalComponent,
    KeeniconComponent,
    ImageComponent,
    ImageCardComponent,
    DateTimePickerComponent,
    GroupListComponent,
    PaginationComponent,
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    KeeniconComponent,
    AddVoteComponent,
    AddSectionComponent,
    GroupListComponent,
    CompareVersionsComponent,
    AddUrgentContentComponent,
    ChooseFromDailyNewsComponent,
    UploadImageComponent,
    ImageCardComponent,
    PaginationComponent,
    AddEditorComponent,
    AddCategoryComponent,
    DateTimePickerComponent,
    ImageComponent,
    AddImageComponent,
    VoteResultComponent,
  ],
})
export class ModalsModule {}
