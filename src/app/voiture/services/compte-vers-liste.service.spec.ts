import { TestBed } from '@angular/core/testing';

import { CompteVersListeService } from './compte-vers-liste.service';

describe('CompteVersListeService', () => {
  let service: CompteVersListeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompteVersListeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
