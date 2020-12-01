import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ICartHasIngredient } from '../entities/cart-has-ingredient.model';
import { ICartHasRecipe } from '../entities/cart-has-recipe.model';
import { ICartIngredient } from '../entities/cart-ingredient.model';
import { ICart } from '../entities/cart.model';
import { IIngredient } from '../entities/ingredient.model';
import { Status } from '../status.enum';
import { CartHasIngredientService } from './cart-has-ingredient.service';
import { CartHasRecipeService } from './cart-has-recipe.service';
import { CartService } from './cart.service';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCartService {
  cart$ = new BehaviorSubject<ICart>(null);
  cart: ICart;

  ci$ = new Subject<ICartIngredient>();
  ci: ICartIngredient[] = [];
  cartInfo$: Observable<string>;
  requesting = true;

  constructor(
    private cartHasIngredientService: CartHasIngredientService,
    private cartHasRecipeService: CartHasRecipeService,
    private ingredientService: IngredientService,
    private cartService: CartService
  ) {
    this.cart$.subscribe((b) => {
      this.cart = b;
      this.cartInfo$ = new Observable<string>((obs) => {
        setInterval(() => {
          obs.next(`Created ${this.cart.created.fromNow()}`);
        }, 1000);
      });
    });
    this.ci$.subscribe((x) => {
      this.ci.push(x);
    });
  }

  getCartIngredients(): Observable<HttpResponse<ICartHasIngredient[]>> {
    return this.cartHasIngredientService.findByCart(this.cart$.value.id);
  }

  getCartRecipes(): Observable<HttpResponse<ICartHasRecipe[]>> {
    return this.cartHasRecipeService.findByCart(this.cart$.value.id);
  }

  loadCartCompleteIngredients(): void {
    this.getCartIngredients().subscribe((response) => {
      if (response.body !== null) {
        this.requesting = true;
        response.body.forEach((chi) => {
          this.ingredientService.find(chi.ingredientId).subscribe((ing) => {
            if (ing.body !== null)
              this.ci$.next(this.buildCartIngredient(ing.body, chi));
          });
        });
        this.requesting = false;
      }
    });
  }

  close(): void {
    const c = this.cart$.value;
    this.cartService.delete(c.id);
    this.cartService.create({
      userId: c.userId,
      userLogin: c.userLogin,
      status: Status.ACTIVE,
    });
  }

  private buildCartIngredient(
    i: IIngredient,
    chi: ICartHasIngredient
  ): ICartIngredient {
    return {
      id: i.id,
      name: i.name,
      amount: chi.amount,
      image: i.image,
      imageContentType: i.imageContentType,
      unitAbbrev: i.unitAbbrev,
      cartId: chi.cartId,
      status: chi.status,
    };
  }
}
