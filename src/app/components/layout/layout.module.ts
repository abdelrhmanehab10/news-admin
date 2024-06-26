import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { RouterModule, Routes } from '@angular/router';
import {
  NgbDropdownModule,
  NgbProgressbarModule,
  NgbTooltipModule,
} from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationModule } from '../../modules/i18n';
import { LayoutComponent } from './layout.component';
import { Routing } from 'src/app/pages/routing';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from 'src/app/_metronic/layout/components/content/content.component';
import { FooterComponent } from 'src/app/_metronic/layout/components/footer/footer.component';
import { ScriptsInitComponent } from './scripts-init/scripts-init.component';
import { ToolbarComponent } from 'src/app/_metronic/layout/components/toolbar/toolbar.component';
import { TopbarComponent } from 'src/app/_metronic/layout/components/topbar/topbar.component';
import { PageTitleComponent } from 'src/app/_metronic/layout/components/header/page-title/page-title.component';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { EngagesComponent } from 'src/app/_metronic/partials/layout/engages/engages.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarLogoComponent } from './sidebar/sidebar-logo/sidebar-logo.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { SidebarFooterComponent } from 'src/app/_metronic/layout/components/sidebar/sidebar-footer/sidebar-footer.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { AccountingComponent } from 'src/app/_metronic/layout/components/toolbar/accounting/accounting.component';
import { ClassicComponent } from 'src/app/_metronic/layout/components/toolbar/classic/classic.component';
import { ExtendedComponent } from 'src/app/_metronic/layout/components/toolbar/extended/extended.component';
import { ReportsComponent } from 'src/app/_metronic/layout/components/toolbar/reports/reports.component';
import { SaasComponent } from 'src/app/_metronic/layout/components/toolbar/saas/saas.component';
import {
  DrawersModule,
  DropdownMenusModule,
  EngagesModule,
  ExtrasModule,
  ModalsModule,
  WidgetsModule,
} from 'src/app/_metronic/partials';
import { ThemeModeModule } from 'src/app/_metronic/partials/layout/theme-mode-switcher/theme-mode.module';
import { SharedModule } from 'src/app/_metronic/shared/shared.module';
import { NewsStatusCountComponent } from './news-status-count/news-status-count.component';
import { ComponentsModule } from '../components.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: Routing,
  },
];

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    ScriptsInitComponent,
    ToolbarComponent,
    TopbarComponent,
    PageTitleComponent,
    HeaderMenuComponent,
    EngagesComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarMenuComponent,
    SidebarFooterComponent,
    NavbarComponent,
    AccountingComponent,
    ClassicComponent,
    ExtendedComponent,
    ReportsComponent,
    SaasComponent,
    NewsStatusCountComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    WidgetsModule,
    RouterModule.forChild(routes),
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    ExtrasModule,
    ModalsModule,
    DrawersModule,
    EngagesModule,
    DropdownMenusModule,
    NgbTooltipModule,
    TranslateModule,
    ThemeModeModule,
    SharedModule,
  ],
  exports: [RouterModule],
})
export class LayoutModule {}
