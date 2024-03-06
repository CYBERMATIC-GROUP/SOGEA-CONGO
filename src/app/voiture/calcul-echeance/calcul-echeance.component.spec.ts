import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculEcheanceComponent } from './calcul-echeance.component';

describe('CalculEcheanceComponent', () => {
  let component: CalculEcheanceComponent;
  let fixture: ComponentFixture<CalculEcheanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalculEcheanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalculEcheanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
