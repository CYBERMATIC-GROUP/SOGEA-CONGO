import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceEnergieComponent } from './source-energie.component';

describe('SourceEnergieComponent', () => {
  let component: SourceEnergieComponent;
  let fixture: ComponentFixture<SourceEnergieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SourceEnergieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceEnergieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
