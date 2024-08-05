import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NewsCategoryService } from '../newsCategory.service';
import { ICategory } from '../../../models/ICategory';

@Component({
  selector: 'app-news-categories',
  templateUrl: './news-categories.component.html',
  styleUrls: ['./news-categories.component.scss']
})

export class NewsCategoriesComponent implements OnInit {
  categories: ICategory[] = [];
  isLoading: boolean = false
  masterSelected: boolean = false
  constructor(private newsCategoryService: NewsCategoryService, private cdr: ChangeDetectorRef) {
  }

  checkUncheckAll(evt: any) {
    this.categories.forEach((c: ICategory) => c.isSelected = evt.target.checked)
  }

  isAllSelected(evt: any, index: any) {
    this.categories[index].isSelected = evt.target.checked
    this.categories.every((item: ICategory) => item.isSelected == true)
  }

  ngOnInit() {
    this.getCategories()
  }

  getCategories() {
    this.isLoading = true
    this.newsCategoryService.getNewsCategories().subscribe((res: any) => {
      this.isLoading = false
      this.categories = res.data
      this.categories.forEach((item: ICategory) => item.isSelected == false)
      this.cdr.detectChanges()
      console.log(this.categories)
    })
  }

  getSubCategories(categoryId: number) {
    this.isLoading = true
    this.newsCategoryService.getNewsSubCategories(categoryId).subscribe((res: any) => {
      this.isLoading = false
      this.cdr.detectChanges()
      return res.data
    })
  }


}
