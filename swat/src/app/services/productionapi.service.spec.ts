import { TestBed } from '@angular/core/testing';

import { ProductionapiService } from './productionapi.service';

describe('ProductionapiService', () => {
  let service: ProductionapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductionapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
