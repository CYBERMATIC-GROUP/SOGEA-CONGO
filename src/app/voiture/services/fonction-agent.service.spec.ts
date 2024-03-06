import { TestBed } from '@angular/core/testing';

import { FonctionAgentService } from './fonction-agent.service';

describe('FonctionAgentService', () => {
  let service: FonctionAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FonctionAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
