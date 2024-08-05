import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoriesComponent } from './news-categories.component';

describe('NewsCategoriesComponent', () => {
  let component: NewsCategoriesComponent;
  let fixture: ComponentFixture<NewsCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCategoriesComponent]
    });
    fixture = TestBed.createComponent(NewsCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
