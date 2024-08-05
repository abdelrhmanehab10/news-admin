import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCategoryAddOrupdateComponent } from './news-category-add-orupdate.component';

describe('NewsCategoryAddOrupdateComponent', () => {
  let component: NewsCategoryAddOrupdateComponent;
  let fixture: ComponentFixture<NewsCategoryAddOrupdateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewsCategoryAddOrupdateComponent]
    });
    fixture = TestBed.createComponent(NewsCategoryAddOrupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
