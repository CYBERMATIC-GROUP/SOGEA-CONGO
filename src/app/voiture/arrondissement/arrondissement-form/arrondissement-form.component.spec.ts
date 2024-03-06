import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrondissementFormComponent } from './arrondissement-form.component';

describe('ArrondissementFormComponent', () => {
  let component: ArrondissementFormComponent;
  let fixture: ComponentFixture<ArrondissementFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrondissementFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrondissementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
