import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from 'src/app/entities/account.model';
import { ICartHasIngredient } from 'src/app/entities/cart-has-ingredient.model';
import { ICartHasRecipe } from 'src/app/entities/cart-has-recipe.model';
import {
  CartIngredient,
  ICartIngredient,
} from 'src/app/entities/cart-ingredient.model';
import { ICart } from 'src/app/entities/cart.model';
import { IIngredient } from 'src/app/entities/ingredient.model';
import { CartHasIngredientService } from 'src/app/service/cart-has-ingredient.service';
import { CartHasRecipeService } from 'src/app/service/cart-has-recipe.service';
import { CartService } from 'src/app/service/cart.service';
import { IngredientService } from 'src/app/service/ingredient.service';
import { Status } from 'src/app/status.enum';

type Call = (response?: any) => any;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() account!: Account;

  cartHasIngredients: ICartHasIngredient[] = [];
  cartHasRecipes: ICartHasRecipe[] = [];
  cartInfo: Observable<string>;

  cartIngredient$ = new Subject<CartIngredient>();
  cartIngredients: ICartIngredient[] = [];
  visibleCartIngredients: ICartIngredient[] = [];

  requesting = false;
  visibilityAll = false;

  private _statusList = [Status.PENDING.toUpperCase()];
  private _cart: ICart | null;

  constructor(
    public cartHasIngredientService: CartHasIngredientService,
    public cartHasRecipeService: CartHasRecipeService,
    public cartService: CartService,
    public ingredientService: IngredientService
  ) {}

  ngOnInit(): void {
    this.cartIngredient$.subscribe((x) => {
      this.cartIngredients.push(x);
      this._filterList();
    });
    this.getCart(() => {
      this.cartInfo = new Observable<string>((obs) => {
        setInterval(() => {
          obs.next(`Created ${this._cart.created.fromNow()}`);
        }, 1000);
      });
    });
  }

  closeCart(): void {
    this.cartService.delete(this._cart.id);
    this.getCart();
  }

  updateCartIngredients(item: ICartIngredient): void {
    console.warn(item);
    this._filterList();
    console.warn(this.cartIngredients.length);
  }

  getCart(cb?: Call): void {
    this.requesting = true;
    this.loadCart((cResponse: any) => {
      this._cart = cResponse.body[0] || null;
      this.loadCartHasIngredients(this._cart, (chiResponse: any) => {
        this.cartHasIngredients = chiResponse;
        this.loadCompleteIngredients(chiResponse, () => {
          this._filterList();
        });
        console.warn(this.visibleCartIngredients);
        this.requesting = false;
      });
      cb();
    });
  }

  loadCompleteIngredients(chiList: ICartHasIngredient[], cb?: Call): any {
    chiList.forEach((chi) => {
      this.ingredientService.find(chi.ingredientId).subscribe((response) => {
        if (response.body !== null)
          this.cartIngredient$.next(
            this.buildCartIngredient(response.body, chi)
          );
      });
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

  private loadCart(cb?: Call): any {
    this.cartService
      .query({ ...{ 'userLogin.equals': this.account.login } })
      .subscribe((response) => cb(response));
  }

  private loadCartHasIngredients(cart?: ICart, cb?: Call): any {
    this.cartHasIngredientService
      .query({ ...{ 'cartId.equals': cart.id } })
      .subscribe((res) => cb(res.body || []));
  }

  toggleVisibility(): void {
    this.visibilityAll = !this.visibilityAll;
    this.visibilityAll
      ? this._statusList.push(Status.ACTIVE.toUpperCase())
      : this._statusList.pop();
    this._filterList();
  }

  private _filterList(): void {
    this.visibleCartIngredients = this.cartIngredients
      .filter((x) => {
        return this._statusList.includes(x.status.toUpperCase());
      })
      .sort((a: any, b: any) => {
        const x = a.status.toUpperCase(),
          y = b.status.toUpperCase();
        return a.status === Status.PENDING || x.status < y.status
          ? 0
          : x.status === Status.PENDING
          ? 1
          : -1;
      });
  }
}
