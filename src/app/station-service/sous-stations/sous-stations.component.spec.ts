import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SousStationsComponent } from './sous-stations.component';

describe('SousStationsComponent', () => {
  let component: SousStationsComponent;
  let fixture: ComponentFixture<SousStationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SousStationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SousStationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
