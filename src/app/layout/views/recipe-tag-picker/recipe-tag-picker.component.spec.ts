import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTagPickerComponent } from './recipe-tag-picker.component';

describe('RecipeTagPickerComponent', () => {
  let component: RecipeTagPickerComponent;
  let fixture: ComponentFixture<RecipeTagPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeTagPickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTagPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
