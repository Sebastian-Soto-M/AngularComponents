import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasePickerComponent } from './base-picker.component';

describe('BasePickerComponent', () => {
  let component: BasePickerComponent;
  let fixture: ComponentFixture<BasePickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasePickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BasePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
