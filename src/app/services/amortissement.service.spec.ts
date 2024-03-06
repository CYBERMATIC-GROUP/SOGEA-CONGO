import { TestBed } from '@angular/core/testing';

import { AmortissementService } from './amortissement.service';

describe('AmortissementService', () => {
  let service: AmortissementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmortissementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
