import { TestBed } from '@angular/core/testing';

import { LesSocieteService } from './les-societe.service';

describe('LesSocieteService', () => {
  let service: LesSocieteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LesSocieteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
