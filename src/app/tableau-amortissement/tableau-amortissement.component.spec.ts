import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableauAmortissementComponent } from './tableau-amortissement.component';

describe('TableauAmortissementComponent', () => {
  let component: TableauAmortissementComponent;
  let fixture: ComponentFixture<TableauAmortissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableauAmortissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableauAmortissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
