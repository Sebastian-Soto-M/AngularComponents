import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTagPkComponent } from './recipe-tag-pk.component';

describe('RecipeTagPkComponent', () => {
  let component: RecipeTagPkComponent;
  let fixture: ComponentFixture<RecipeTagPkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecipeTagPkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeTagPkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
