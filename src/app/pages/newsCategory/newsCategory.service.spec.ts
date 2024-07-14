import { TestBed } from '@angular/core/testing';

import { NewsCategoryService } from './newsCategory.service';

describe('NewsCategoryService', () => {
  let service: NewsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
