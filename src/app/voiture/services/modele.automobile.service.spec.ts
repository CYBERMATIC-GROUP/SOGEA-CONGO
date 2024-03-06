import { TestBed } from '@angular/core/testing';

import { ModeleAutomobileService } from './modele.automobile.service';

describe('ModeleAutomobileService', () => {
  let service: ModeleAutomobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModeleAutomobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
