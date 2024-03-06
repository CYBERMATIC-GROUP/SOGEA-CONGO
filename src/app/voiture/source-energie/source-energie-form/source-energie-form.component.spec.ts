import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEnergieFormComponent } from './source-energie-form.component';

describe('SourceEnergieFormComponent', () => {
  let component: SourceEnergieFormComponent;
  let fixture: ComponentFixture<SourceEnergieFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceEnergieFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceEnergieFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
