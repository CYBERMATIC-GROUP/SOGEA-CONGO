import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomobileFormComponent } from './automobile-form.component';

describe('AutomobileFormComponent', () => {
  let component: AutomobileFormComponent;
  let fixture: ComponentFixture<AutomobileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomobileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutomobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
