import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ThemeModeSwitcherComponent } from './theme-mode-switcher.component';
import { SharedModule } from '../../../shared/shared.module';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ThemeModeSwitcherComponent],
  imports: [CommonModule, InlineSVGModule, SharedModule, ComponentsModule],
  exports: [ThemeModeSwitcherComponent],
})
export class ThemeModeModule {}
