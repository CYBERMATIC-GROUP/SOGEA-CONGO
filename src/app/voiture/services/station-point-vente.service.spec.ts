import { TestBed } from '@angular/core/testing';

import { StationPointVenteService } from './station-point-vente.service';

describe('StationPointVenteService', () => {
  let service: StationPointVenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationPointVenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
