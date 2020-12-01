import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICartHasRecipe } from 'src/app/entities/cart-has-recipe.model';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CartHasRecipeService } from 'src/app/service/cart-has-recipe.service';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  recipeList: ICartHasRecipe;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ICartIngredient,
    private chrService: CartHasRecipeService
  ) {}

  ngOnInit(): void {
    this.chrService
      .query({
        ...{ 'cartId.equals': this.data.cartId },
      })
      .subscribe((res) => {
        console.warn(res);
      });
  }
}
