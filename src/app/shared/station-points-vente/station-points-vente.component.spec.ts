import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationPointsVenteComponent } from './station-points-vente.component';

describe('StationPointsVenteComponent', () => {
  let component: StationPointsVenteComponent;
  let fixture: ComponentFixture<StationPointsVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationPointsVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationPointsVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
