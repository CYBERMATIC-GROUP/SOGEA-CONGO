import { TestBed } from '@angular/core/testing';

import { MarqueAutomobileService } from './marque-automobile.service';

describe('MarqueAutomobileService', () => {
  let service: MarqueAutomobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarqueAutomobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
