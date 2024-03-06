import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeleAutomobileComponent } from './modele-automobile.component';

describe('ModeleAutomobileComponent', () => {
  let component: ModeleAutomobileComponent;
  let fixture: ComponentFixture<ModeleAutomobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModeleAutomobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModeleAutomobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
