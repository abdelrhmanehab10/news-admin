import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishComponent } from './publish/publish.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { ComponentsModule } from '../../components/components.module';
import { NewsStatusComponent } from './news-status/news-status.component';
import { EditorNewsStateComponent } from './editor-news-state/editor-news-state.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AddNewWithIdComponent } from './add-new-with-id/add-new-with-id.component';
import { OrderNewsComponent } from './order-news/order-news.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AllVotesComponent } from './all-votes/all-votes.component';
import { SectionsComponent } from './sections/sections.component';
import { UrgentNewsComponent } from './urgent-news/urgent-news.component';
import { MainNewsComponent } from './main-news/main-news.component';
import { CommentsComponent } from './comments/comments.component';
import { DeletedNewsComponent } from './deleted-news/deleted-news.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditorsComponent } from './editors/editors.component';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { CategoryComponent } from './category/category.component';
import { VersionsComponent } from './versions/versions.component';
import { OperationsComponent } from './operations/operations.component';

@NgModule({
  declarations: [
    PublishComponent,
    NewsStatusComponent,
    EditorNewsStateComponent,
    AddNewComponent,
    AddNewWithIdComponent,
    OrderNewsComponent,
    SectionsComponent,
    AllVotesComponent,
    UrgentNewsComponent,
    MainNewsComponent,
    CommentsComponent,
    DeletedNewsComponent,
    EditorsComponent,
    CategoryComponent,
    VersionsComponent,
    OperationsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    ComponentsModule,
    DragDropModule,
    ReactiveFormsModule,
    EditorComponent,
  ],
})
export class DashboardModule {}
