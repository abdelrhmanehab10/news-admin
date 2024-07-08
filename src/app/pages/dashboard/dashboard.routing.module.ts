import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishComponent } from './publish/publish.component';
import { NewsStatusComponent } from './news-status/news-status.component';
import { EditorNewsStateComponent } from './editor-news-state/editor-news-state.component';
import { AddNewComponent } from './add-new/add-new.component';
import { AddNewWithIdComponent } from './add-new-with-id/add-new-with-id.component';
import { OrderNewsComponent } from './order-news/order-news.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
