import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { ThemeModeSwitcherComponent } from './theme-mode-switcher.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [ThemeModeSwitcherComponent],
  imports: [CommonModule, InlineSVGModule, ComponentsModule],
  exports: [ThemeModeSwitcherComponent],
})
export class ThemeModeModule {}
