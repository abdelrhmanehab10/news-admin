import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { PublishComponent } from './publish/publish.component';

@NgModule({
  declarations: [PublishComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
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
        ],
      },
    ]),
    WidgetsModule,
    ModalsModule,
  ],
})
export class DashboardModule {}
