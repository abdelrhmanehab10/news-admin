import { NgModule } from '@angular/core';
import { TablesWidget9Component } from './shared/table/tables-widget9.component';
import { KeeniconComponent } from './shared/keenicon/keenicon.component';
import { DropdownMenu1Component } from './shared/dropdown/dropdown-menu1.component';

@NgModule({
  declarations: [
    TablesWidget9Component,
    KeeniconComponent,
    DropdownMenu1Component,
  ],
  exports: [TablesWidget9Component, KeeniconComponent, DropdownMenu1Component],
})
export class ComponentsModule {}
