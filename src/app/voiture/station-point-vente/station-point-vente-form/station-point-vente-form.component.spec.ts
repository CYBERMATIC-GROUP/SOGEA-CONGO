import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationPointVenteFormComponent } from './station-point-vente-form.component';

describe('StationPointVenteFormComponent', () => {
  let component: StationPointVenteFormComponent;
  let fixture: ComponentFixture<StationPointVenteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StationPointVenteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationPointVenteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
