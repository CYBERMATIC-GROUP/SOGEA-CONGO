import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationPointVenteComponent } from './station-point-vente.component';

describe('StationPointVenteComponent', () => {
  let component: StationPointVenteComponent;
  let fixture: ComponentFixture<StationPointVenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationPointVenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationPointVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
