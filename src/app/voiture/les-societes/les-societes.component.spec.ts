import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LesSocietesComponent } from './les-societes.component';

describe('LesSocietesComponent', () => {
  let component: LesSocietesComponent;
  let fixture: ComponentFixture<LesSocietesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LesSocietesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LesSocietesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
