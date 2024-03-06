import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouscriptionDetailsComponent } from './souscription-details.component';

describe('SouscriptionDetailsComponent', () => {
  let component: SouscriptionDetailsComponent;
  let fixture: ComponentFixture<SouscriptionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouscriptionDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouscriptionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
