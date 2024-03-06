import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompteVersListeFormComponent } from './compte-vers-liste-form.component';

describe('CompteVersListeFormComponent', () => {
  let component: CompteVersListeFormComponent;
  let fixture: ComponentFixture<CompteVersListeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompteVersListeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompteVersListeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
