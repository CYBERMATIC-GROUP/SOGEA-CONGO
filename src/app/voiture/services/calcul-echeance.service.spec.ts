import { TestBed } from '@angular/core/testing';

import { CalculEcheanceService } from './calcul-echeance.service';

describe('CalculEcheanceService', () => {
  let service: CalculEcheanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalculEcheanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
