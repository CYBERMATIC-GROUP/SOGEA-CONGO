import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleAutomobileFormComponent } from './modele-automobile-form.component';

describe('ModeleAutomobileFormComponent', () => {
  let component: ModeleAutomobileFormComponent;
  let fixture: ComponentFixture<ModeleAutomobileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleAutomobileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleAutomobileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
