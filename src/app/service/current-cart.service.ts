import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICartHasIngredient } from '../entities/cart-has-ingredient.model';
import { ICartHasRecipe } from '../entities/cart-has-recipe.model';
import { ICartIngredient } from '../entities/cart-ingredient.model';
import { ICart } from '../entities/cart.model';
import { CartHasIngredientService } from './cart-has-ingredient.service';
import { CartHasRecipeService } from './cart-has-recipe.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCartService {
  cart$ = new BehaviorSubject<ICart>(null);

  ci$ = new Subject<ICartIngredient>();
  ci: ICartIngredient[] = [];

  constructor(
    private cartHasIngredientService: CartHasIngredientService,
    private cartHasRecipeService: CartHasRecipeService
  ) {}

  getCartIngredients(): Observable<HttpResponse<ICartHasIngredient[]>> {
    return this.cartHasIngredientService.findByCart(this.cart$.value.id);
  }

  getCartRecipes(): Observable<HttpResponse<ICartHasRecipe[]>> {
    return this.cartHasRecipeService.findByCart(this.cart$.value.id);
  }
}
