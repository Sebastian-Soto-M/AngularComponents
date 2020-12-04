import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { ICartHasIngredient } from '../entities/cart-has-ingredient.model';
import { ICartHasRecipe } from '../entities/cart-has-recipe.model';
import { ICartIngredient } from '../entities/cart-ingredient.model';
import { ICart } from '../entities/cart.model';
import { IIngredient } from '../entities/ingredient.model';
import { Status } from '../status.enum';
import { CartHasIngredientService } from './cart-has-ingredient.service';
import { CartHasRecipeService } from './cart-has-recipe.service';
import { CartIngredientService } from './cart-ingredient.service';
import { CartService } from './cart.service';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCartService {
  cart: ICart;
  ci: ICartIngredient[] = [];
  cartInfo$: Observable<string>;

  stats$ = new BehaviorSubject<string>('0/0');

  ci$ = new Subject<ICartIngredient>();

  constructor(
    private cartIngredientService: CartIngredientService,
    private chiService: CartHasIngredientService,
    private iService: IngredientService,
    private cartService: CartService
  ) {}

  setCart(c: ICart): void {
    this.cart = c;
    this.cartInfo$ = new Observable<string>((obs) => {
      setInterval(() => {
        obs.next(`Created ${this.cart.created.fromNow()}`);
      }, 1000);
    });
    this.setCartIngredients();
  }

  unsubscribe(): void {
    this.ci$.unsubscribe();
    this.stats$.unsubscribe();
  }

  setCartIngredients(): void {
    const queries: Observable<ICartIngredient>[] = [];

    this.chiService.findByCart(this.cart.id).subscribe((response) => {
      if (response.body !== null) {
        response.body.forEach((chi) => {
          this.iService.find(chi.ingredientId).subscribe((ing) => {
            if (ing.body !== null) {
              let obs = of(this.cartIngredientService.map(ing.body, chi));
              obs.subscribe((x) => {
                this.ci.push(x);
                this.stats$.next(this.getFraction());
              });
              queries.push(obs);
            }
          });
        });
      }
    });

    forkJoin(queries).subscribe();
  }

  private getFraction(): string {
    return `${this.getAmountSelected()}/${this.ci.length}`;
  }

  private getAmountSelected(): number {
    return this.ci.filter((x) => {
      return x.status.toUpperCase() === 'ACTIVE';
    }).length;
  }
}
