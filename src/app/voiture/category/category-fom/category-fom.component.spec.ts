import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryFomComponent } from './category-fom.component';

describe('CategoryFomComponent', () => {
  let component: CategoryFomComponent;
  let fixture: ComponentFixture<CategoryFomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryFomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryFomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
