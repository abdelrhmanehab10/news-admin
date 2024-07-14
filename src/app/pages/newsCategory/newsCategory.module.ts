import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsCategoriesComponent } from './news-categories/news-categories.component';
import { NewsCategoryAddOrupdateComponent } from './news-category-add-orupdate/news-category-add-orupdate.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../_metronic/shared/shared.module';

const routes : Routes = [
  {path:'',component:NewsCategoriesComponent},
  {path:'add',component:NewsCategoryAddOrupdateComponent},
  {path:'update/:id',component:NewsCategoryAddOrupdateComponent},
]

@NgModule({
  declarations: [
    NewsCategoriesComponent,
    NewsCategoryAddOrupdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class NewsCategoryModule { }
