import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeparementFormComponent } from './deparement-form.component';

describe('DeparementFormComponent', () => {
  let component: DeparementFormComponent;
  let fixture: ComponentFixture<DeparementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeparementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeparementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
