import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeAutomobileFormComponent } from './type-automobile-form.component';

describe('TypeAutomobileFormComponent', () => {
  let component: TypeAutomobileFormComponent;
  let fixture: ComponentFixture<TypeAutomobileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TypeAutomobileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeAutomobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
