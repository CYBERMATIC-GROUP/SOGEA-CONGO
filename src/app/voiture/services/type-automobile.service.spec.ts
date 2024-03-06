import { TestBed } from '@angular/core/testing';

import { TypeAutomobileService } from './type-automobile.service';

describe('TypeAutomobileService', () => {
  let service: TypeAutomobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypeAutomobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
