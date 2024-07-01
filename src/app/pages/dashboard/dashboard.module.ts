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

@NgModule({
  declarations: [
    PublishComponent,
    NewsStatusComponent,
    EditorNewsStateComponent,
    AddNewComponent,
    AddNewWithIdComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ComponentsModule,
    // WidgetsModule, ModalsModule
  ],
})
export class DashboardModule {}
