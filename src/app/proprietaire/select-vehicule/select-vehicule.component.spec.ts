import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectVehiculeComponent } from './select-vehicule.component';

describe('SelectVehiculeComponent', () => {
  let component: SelectVehiculeComponent;
  let fixture: ComponentFixture<SelectVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectVehiculeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
