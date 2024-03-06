import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VinietteComponent } from './viniette.component';

describe('VinietteComponent', () => {
  let component: VinietteComponent;
  let fixture: ComponentFixture<VinietteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VinietteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VinietteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
