import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishComponent } from './publish/publish.component';
import { NewsStatusComponent } from './news-status/news-status.component';
import { EditorNewsStateComponent } from './editor-news-state/editor-news-state.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AddNewWithIdComponent } from './add-new-with-id/add-new-with-id.component';
import { OrderNewsComponent } from './order-news/order-news.component';
import { AllVotesComponent } from './all-votes/all-votes.component';
import { SectionsComponent } from './sections/sections.component';
import { UrgentNewsComponent } from './urgent-news/urgent-news.component';
import { MainNewsComponent } from './main-news/main-news.component';
import { CommentsComponent } from './comments/comments.component';
import { DeletedNewsComponent } from './deleted-news/deleted-news.component';
import { EditorsComponent } from './editors/editors.component';
import { VersionsComponent } from './versions/versions/versions.component';
import { CategoryComponent } from './category/category.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'publish',
        pathMatch: 'full',
      },
      {
        path: 'publish',
        component: PublishComponent,
      },
      {
        path: 'main-news',
        component: MainNewsComponent,
      },
      {
        path: 'news-status',
        component: NewsStatusComponent,
      },
      {
        path: 'editor-news-state',
        component: EditorNewsStateComponent,
      },
      {
        path: 'add-new',
        component: AddNewComponent,
      },
      {
        path: 'add-new-with-id',
        component: AddNewWithIdComponent,
      },
      {
        path: 'order-news',
        component: OrderNewsComponent,
      },
      {
        path: 'all-votes',
        component: AllVotesComponent,
      },
      {
        path: 'sections',
        component: SectionsComponent,
      },
      {
        path: 'category',
        component: CategoryComponent,
      },
      {
        path: 'urgent-news',
        component: UrgentNewsComponent,
      },
      {
        path: 'comments',
        component: CommentsComponent,
      },
      {
        path: 'deleted-news',
        component: DeletedNewsComponent,
      },
      {
        path: 'editors',
        component: EditorsComponent,
      },
      {
        path: 'versions/:id',
        component: VersionsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
