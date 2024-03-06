import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueAutomobileComponent } from './marque-automobile.component';

describe('MarqueAutomobileComponent', () => {
  let component: MarqueAutomobileComponent;
  let fixture: ComponentFixture<MarqueAutomobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarqueAutomobileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueAutomobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
