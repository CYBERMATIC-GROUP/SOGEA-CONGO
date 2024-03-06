import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenModalTokenComponent } from './open-modal-token.component';

describe('OpenModalTokenComponent', () => {
  let component: OpenModalTokenComponent;
  let fixture: ComponentFixture<OpenModalTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenModalTokenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenModalTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
