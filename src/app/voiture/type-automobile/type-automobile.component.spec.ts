import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAutomobileComponent } from './type-automobile.component';

describe('TypeAutomobileComponent', () => {
  let component: TypeAutomobileComponent;
  let fixture: ComponentFixture<TypeAutomobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAutomobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAutomobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
