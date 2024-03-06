import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionAgentFormComponent } from './fonction-agent-form.component';

describe('FonctionAgentFormComponent', () => {
  let component: FonctionAgentFormComponent;
  let fixture: ComponentFixture<FonctionAgentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionAgentFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionAgentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
