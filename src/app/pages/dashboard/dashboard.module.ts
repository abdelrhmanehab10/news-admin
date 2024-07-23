import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
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
import { NewsCategoriesComponent } from '../newsCategory/news-categories/news-categories.component';
import { NewsCategoryAddOrupdateComponent } from '../newsCategory/news-category-add-orupdate/news-category-add-orupdate.component';
import { SectionsComponent } from './sections/sections.component';
import { UrgentNewsComponent } from './urgent-news/urgent-news.component';
import { MainNewsComponent } from './main-news/main-news.component';
import { CommentsComponent } from './comments/comments.component';
import { DeletedNewsComponent } from './deleted-news/deleted-news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorsComponent } from './editors/editors.component';

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
    NewsCategoriesComponent,
    NewsCategoryAddOrupdateComponent,
    UrgentNewsComponent,
    MainNewsComponent,
    CommentsComponent,
    DeletedNewsComponent,
    EditorsComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    DragDropModule,
    ReactiveFormsModule,
    // WidgetsModule, ModalsModule
  ],
})
export class DashboardModule {}
