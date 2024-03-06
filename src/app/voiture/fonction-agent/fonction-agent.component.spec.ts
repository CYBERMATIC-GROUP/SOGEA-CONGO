import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FonctionAgentComponent } from './fonction-agent.component';

describe('FonctionAgentComponent', () => {
  let component: FonctionAgentComponent;
  let fixture: ComponentFixture<FonctionAgentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FonctionAgentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FonctionAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
