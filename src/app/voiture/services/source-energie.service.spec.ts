import { TestBed } from '@angular/core/testing';

import { SourceEnergieService } from './source-energie.service';

describe('SourceEnergieService', () => {
  let service: SourceEnergieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SourceEnergieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
