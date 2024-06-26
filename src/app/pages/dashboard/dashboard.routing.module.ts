import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublishComponent } from './publish/publish.component';
import { NewsStatusComponent } from './news-status/news-status.component';

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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
