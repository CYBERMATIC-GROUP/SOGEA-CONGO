import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitingValidationComponent } from './waiting-validation.component';

describe('WaitingValidationComponent', () => {
  let component: WaitingValidationComponent;
  let fixture: ComponentFixture<WaitingValidationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaitingValidationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaitingValidationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
