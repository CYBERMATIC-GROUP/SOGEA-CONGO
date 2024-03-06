import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParmAutomobileComponent } from './parm.automobile.component';

describe('ParmAutomobileComponent', () => {
  let component: ParmAutomobileComponent;
  let fixture: ComponentFixture<ParmAutomobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParmAutomobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParmAutomobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
