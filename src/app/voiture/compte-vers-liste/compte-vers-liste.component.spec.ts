import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteVersListeComponent } from './compte-vers-liste.component';

describe('CompteVersListeComponent', () => {
  let component: CompteVersListeComponent;
  let fixture: ComponentFixture<CompteVersListeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteVersListeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteVersListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
