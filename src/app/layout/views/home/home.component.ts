import { Component, OnInit, ViewChild } from '@angular/core';
import { IngredientPickerComponent } from 'src/app/components/ingredient-picker/ingredient-picker.component';
import { RecipeTagPickerComponent } from 'src/app/components/recipe-tag-picker/recipe-tag-picker.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('recipePk') recipePicker!: RecipeTagPickerComponent;
  @ViewChild('ingredientPk') ingredientPicker!: IngredientPickerComponent;

  constructor() {}

  ngOnInit(): void {}
}
