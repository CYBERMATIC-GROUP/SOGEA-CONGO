import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueAutoFormComponent } from './marque-auto-form.component';

describe('MarqueAutoFormComponent', () => {
  let component: MarqueAutoFormComponent;
  let fixture: ComponentFixture<MarqueAutoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarqueAutoFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarqueAutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
