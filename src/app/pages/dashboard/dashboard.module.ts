import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { ModalsModule, WidgetsModule } from '../../_metronic/partials';
import { PublishComponent } from './publish/publish.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { ComponentsModule } from '../../components/components.module';
import { NewsStatusComponent } from './news-status/news-status.component';

@NgModule({
  declarations: [PublishComponent, NewsStatusComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    // WidgetsModule, ModalsModule
  ],
})
export class DashboardModule {}
