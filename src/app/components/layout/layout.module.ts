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
import { LayoutComponent } from './layout.component';
import { Routing } from 'src/app/pages/routing';
import { HeaderComponent } from './header/header.component';
import { ContentComponent } from './content/content.component';
import { ScriptsInitComponent } from './scripts-init/scripts-init.component';
import { HeaderMenuComponent } from './header/header-menu/header-menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SidebarLogoComponent } from './sidebar/sidebar-logo/sidebar-logo.component';
import { SidebarMenuComponent } from './sidebar/sidebar-menu/sidebar-menu.component';
import { NavbarComponent } from './header/navbar/navbar.component';
import { NewsStatusCountComponent } from './news-status-count/news-status-count.component';
import { TranslationModule } from 'src/app/modules/i18n';
import { ThemeModeSwitcherComponent } from './theme-mode-switcher/theme-mode-switcher.component';
import { LayoutScrollTopComponent } from './scroll-top/scroll-top.component';
import { KeeniconComponent } from '../shared/keenicon/keenicon.component';
import { StatsComponent } from '../shared/stats/stats.component';
import { UserInnerComponent } from './user-inner/user-inner.component';

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
    ScriptsInitComponent,
    HeaderMenuComponent,
    SidebarComponent,
    SidebarLogoComponent,
    SidebarMenuComponent,
    NavbarComponent,
    NewsStatusCountComponent,
    LayoutScrollTopComponent,
    KeeniconComponent,
    StatsComponent,
    ThemeModeSwitcherComponent,
    UserInnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    TranslationModule,
    InlineSVGModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    TranslateModule,
    InlineSVGModule,
  ],
  exports: [RouterModule, KeeniconComponent],
})
export class LayoutModule {}
