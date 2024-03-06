import { TestBed } from '@angular/core/testing';

import { SationsService } from './sations.service';

describe('SationsService', () => {
  let service: SationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
