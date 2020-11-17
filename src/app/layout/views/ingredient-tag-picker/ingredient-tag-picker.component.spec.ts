import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngredientTagPickerComponent } from './ingredient-tag-picker.component';

describe('IngredientTagPickerComponent', () => {
  let component: IngredientTagPickerComponent;
  let fixture: ComponentFixture<IngredientTagPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngredientTagPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngredientTagPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
