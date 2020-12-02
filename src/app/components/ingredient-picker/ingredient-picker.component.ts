import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CartIngredient } from 'src/app/entities/cart-ingredient.model';
import { IIngredient } from 'src/app/entities/ingredient.model';
import { IngredientService } from 'src/app/service/ingredient.service';
import { Status } from 'src/app/status.enum';

@Component({
  selector: 'app-ingredient-picker',
  templateUrl: './ingredient-picker.component.html',
  styleUrls: ['./ingredient-picker.component.scss'],
})
export class IngredientPickerComponent implements OnInit {
  reloadTagList$ = new BehaviorSubject<boolean>(true);
  ingredients: IIngredient[];
  form: FormGroup;

  constructor(public service: IngredientService) {}

  ngOnInit(): void {
    this.reloadTagList$.subscribe((_) => {
      this.service.query().subscribe((response: any) => {
        this.ingredients = response.body.sort(
          (a: IIngredient, b: IIngredient) => {
            return a.id > b.id ? 1 : -1;
          }
        );
      });
    });
  }

  getIngredients(): any[] {
    return this.form !== undefined ? this.form.value.selections : [];
  }

  getCartIngredients(): CartIngredient[] {
    const ingredientList = this.getIngredients();
    let ciList: CartIngredient[] = [];
    ingredientList.forEach((item) => {
      ciList.push({
        id: item.ingredient.id,
        name: item.ingredient.name,
        amount: item.amount,
        status: Status.PENDING.toUpperCase() as Status,
      });
    });
    return ciList;
  }
}
