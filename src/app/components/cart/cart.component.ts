import { Component, Input, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
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
  private _cart: ICart | null;
  public cartIngredients: ICartIngredient[] = [];
  public cartHasIngredients: ICartHasIngredient[] = [];
  public cartHasRecipes: ICartHasRecipe[] = [];
  cartInfo: Observable<string>;
  requesting = false;

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
    this.cartIngredients.push({
      id: 1,
      name: 'test',
      amount: 200,
      unitAbbrev: 'g',
      status: Status.PENDING,
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
  }
}
