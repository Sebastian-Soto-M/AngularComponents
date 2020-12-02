import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IngredientPickerComponent } from 'src/app/components/ingredient-picker/ingredient-picker.component';
import { CurrentCartService } from 'src/app/service/current-cart.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit {
  @ViewChild('ingredientPicker') ingredientPicker: IngredientPickerComponent;

  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    public service: CurrentCartService
  ) {}

  ngOnInit(): void {}

  addIngredientsToCart(): void {
    this.service.addIngredients(this.ingredientPicker.getCartIngredients());
    this.dialogRef.close();
  }
}
