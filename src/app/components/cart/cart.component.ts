import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from 'src/app/entities/account.model';
import { ICartHasIngredient } from 'src/app/entities/cart-has-ingredient.model';
import { ICartHasRecipe } from 'src/app/entities/cart-has-recipe.model';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { ICart } from 'src/app/entities/cart.model';
import { IIngredient } from 'src/app/entities/ingredient.model';
import { CartHasIngredientService } from 'src/app/service/cart-has-ingredient.service';
import { CartHasRecipeService } from 'src/app/service/cart-has-recipe.service';
import { CartService } from 'src/app/service/cart.service';
import { Status } from 'src/app/status.enum';

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
  cartIngredients: ICartIngredient[] = [];
  visibleCartIngredients: ICartIngredient[] = [];
  requesting = false;
  private _statusList = [Status.PENDING];
  private _cart: ICart | null;
  visibilityAll = false;

  constructor(
    public cartHasIngredientService: CartHasIngredientService,
    public cartHasRecipeService: CartHasRecipeService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCart();
    this.cartInfo = new Observable<string>((obs) => {
      setInterval(() => {
        obs.next(`Created ${this._cart.created.fromNow()}`);
      }, 1000);
    });
  }

  addItem(item: IIngredient): void {}

  addRecipe(item: ICartHasRecipe): void {}

  removeItem(id: number): void {}

  removeRecipe(id: number): void {}

  updateItem(item: ICartHasIngredient): void {}

  closeCart(): void {
    this.cartService.delete(this._cart.id);
    this.getCart();
  }

  toggleVisibility(): void {
    this.visibilityAll = !this.visibilityAll;
    this.visibilityAll
      ? this._statusList.push(Status.ACTIVE)
      : this._statusList.pop();
    this._filterList();
    console.warn(this._statusList);
    console.warn(this.cartIngredients.length);
  }

  updateCartIngredients(item: ICartIngredient): void {
    console.warn(this.cartIngredients.indexOf(item));
    this._filterList();
  }

  private _filterList(): void {
    this.visibleCartIngredients = this.cartIngredients
      .filter((x) => {
        return this._statusList.includes(x.status);
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

  protected getCart(): void {
    this.requesting = true;
    this.cartService
      .query({
        ...{
          'userLogin.equals': this.account.login,
        },
      })
      .subscribe((res) => {
        this._cart = res.body[0] || null;
        this.requesting = false;
      });
    this.cartIngredients.push(
      {
        id: 1,
        name: 't1',
        amount: 200,
        unitAbbrev: 'g',
        status: Status.PENDING,
      },
      {
        id: 2,
        name: 't2',
        amount: 100,
        unitAbbrev: 'ml',
        status: Status.ACTIVE,
      },
      {
        id: 3,
        name: 't3',
        amount: 50,
        unitAbbrev: 'kg',
        status: Status.PENDING,
      }
    );
    this._filterList();
  }
}
