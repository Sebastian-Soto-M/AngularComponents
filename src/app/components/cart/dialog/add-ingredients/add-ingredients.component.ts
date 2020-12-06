import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {IngredientPickerComponent} from 'src/app/components/ingredient-picker/ingredient-picker.component';
import {CurrentCartService} from 'src/app/service/current-cart.service';

@Component({
  selector: 'app-add-ingredients',
  templateUrl: './add-ingredients.component.html',
  styleUrls: ['./add-ingredients.component.scss'],
})
export class AddIngredientsComponent implements OnInit {
  @ViewChild('ingredientPicker') ingredientPicker: IngredientPickerComponent;

  constructor(
    public dialogRef: MatDialogRef<AddIngredientsComponent>,
    public service: CurrentCartService
  ) {
  }

  ngOnInit(): void {
  }

  addIngredientsToCart(): void {
    this.service.addIngredients(this.ingredientPicker.getCartIngredients());
    this.dialogRef.close();
  }
}
