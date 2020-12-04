import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
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

  hasChanges = false;
  cartInfo$: Observable<string>;

  chiActions$: Observable<HttpResponse<ICartHasIngredient>>[] = [];

  requesting = true;

  private _statusList!: string[];
  visibility$ = new BehaviorSubject<boolean>(true);

  constructor(
    private cartHasIngredientService: CartHasIngredientService,
    private cartHasRecipeService: CartHasRecipeService,
    private ingredientService: IngredientService,
    private cartService: CartService
  ) {}

  // Status Actions
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

  // Visibility
  toggleVisibility(): void {
    this.visibility$.next(!this.visibility$.value);
  }

  getVisibleItems(): ICartIngredient[] {
    return this.ci
      .filter((x) => {
        return this._statusList.includes(x.status.toUpperCase());
      })
      .sort((a: any, b: any) => {
        let x = a.status.toUpperCase(),
          y = b.status.toUpperCase();
        return y.localeCompare(x);
      });
  }

  closeCart(): void {
    const c = this.cart$.value;
    this.cartService.delete(c.id);
    this.cartService.create({
      userId: c.userId,
      userLogin: c.userLogin,
      status: Status.ACTIVE,
    });
  }

  // Ingredients
  getCartIngredients(): Observable<HttpResponse<ICartHasIngredient[]>> {
    return this.cartHasIngredientService.findByCart(this.cart$.value.id);
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

  addIngredients(ingredientList: ICartIngredient[]): void {
    ingredientList.forEach((ing) => {
      const chi = {
        amount: ing.amount,
        status: ing.status,
        cartId: this.cart.id,
        ingredientName: ing.name,
        ingredientId: ing.id,
      };
      this.chiActions$.push(this.cartHasIngredientService.create(chi));
    });
  }

  removeIngredient(item: ICartIngredient): void {
    this.ci.splice(this.ci.indexOf(item), 1);
    this.civ = this.getVisibleItems();
    this.chiActions$.push(this.cartHasIngredientService.delete(item.id));
    this.hasChanges = true;
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

  // Actions
  getCartRecipes(): Observable<HttpResponse<ICartHasRecipe[]>> {
    return this.cartHasRecipeService.findByCart(this.cart$.value.id);
  }

  // Subscriptions
  setCart(c: ICart) {
    this.cart = c;
    this.cartInfo$ = new Observable<string>((obs) => {
      setInterval(() => {
        obs.next(`Created ${this.cart.created.fromNow()}`);
      }, 1000);
    });
  }

  insertNewCartIngredient(ci: ICartIngredient) {
    this.ci.push(ci);
    this.civ = this.getVisibleItems();
  }

  setVisibleItems(viewAll: boolean) {
    this._statusList = viewAll ? ['PENDING', 'ACTIVE'] : ['PENDING'];
    this.civ = this.getVisibleItems();
  }

  subscribeActions() {
    forkJoin(this.chiActions$).subscribe();
    this.chiActions$ = [];
  }
}
