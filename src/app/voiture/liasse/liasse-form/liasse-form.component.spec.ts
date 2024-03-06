import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiasseFormComponent } from './liasse-form.component';

describe('LiasseFormComponent', () => {
  let component: LiasseFormComponent;
  let fixture: ComponentFixture<LiasseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LiasseFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LiasseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
