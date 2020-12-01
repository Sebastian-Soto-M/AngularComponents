import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
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
  civ: ICartIngredient[] = [];

  cartInfo$: Observable<string>;

  requesting = true;

  private _statusList!: string[];
  visibility$ = new BehaviorSubject<boolean>(true);

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
      this.civ = this.getVisibleItems();
    });
    this.visibility$.subscribe((viewAll) => {
      this._statusList = viewAll ? ['PENDING', 'ACTIVE'] : ['PENDING'];
      this.civ = this.getVisibleItems();
    });
  }

  // Actions
  toggleStatus(index: number): void {
    const i = this.ci[this.ci.indexOf(this.civ[index])]; // ingredient
    i.status =
      i.status !== Status.PENDING.toUpperCase()
        ? (Status.PENDING.toUpperCase() as Status)
        : (Status.ACTIVE.toUpperCase() as Status);
    this.civ = this.getVisibleItems();
  }

  setStatusToAll(status: Status): void {
    this.ci.forEach((x) => (x.status = status.toUpperCase() as Status));
    this.civ = this.getVisibleItems();
  }

  toggleVisibility(): void {
    this.visibility$.next(!this.visibility$.value);
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

  updateCart(): void {}
  // Actions

  // Data setup
  getCartIngredients(): Observable<HttpResponse<ICartHasIngredient[]>> {
    return this.cartHasIngredientService.findByCart(this.cart$.value.id);
  }

  getCartRecipes(): Observable<HttpResponse<ICartHasRecipe[]>> {
    return this.cartHasRecipeService.findByCart(this.cart$.value.id);
  }

  loadCartCompleteIngredients(): void {
    this.requesting = true;
    this.getCartIngredients().subscribe((response) => {
      if (response.body !== null) {
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

  getVisibleItems(): ICartIngredient[] {
    return this.ci
      .filter((x) => {
        return this._statusList.includes(x.status.toUpperCase());
      })
      .sort((a: any, b: any) => {
        const x = a.status,
          y = b.status;
        return a.status === Status.PENDING || x.status < y.status
          ? 0
          : x.status === Status.PENDING
          ? 1
          : -1;
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
  // Data setup
}
