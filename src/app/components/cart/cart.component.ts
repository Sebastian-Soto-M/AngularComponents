import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/entities/account.model';
import { ICartHasIngredient } from 'src/app/entities/cart-has-ingredient.model';
import { ICartHasRecipe } from 'src/app/entities/cart-has-recipe.model';
import { ICart } from 'src/app/entities/cart.model';
import { IIngredient } from 'src/app/entities/ingredient.model';
import { CartHasIngredientService } from 'src/app/service/cart-has-ingredient.service';
import { CartHasRecipeService } from 'src/app/service/cart-has-recipe.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() account!: Account;
  private _cart: ICart | null;
  public cartIngredients: ICartHasIngredient[] = [];
  public cartRecipes: ICartHasRecipe[] = [];

  constructor(
    public cartHasIngredientService: CartHasIngredientService,
    public cartHasRecipeService: CartHasRecipeService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getCart();
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

  cartInfo(): string {
    return `Created ${this._cart.created.fromNow()}`;
  }

  protected getCart(): void {
    this.cartService
      .query({
        ...{
          'userLogin.equals': this.account.login,
        },
      })
      .subscribe((res) => (this._cart = res.body[0] || null));
  }
}
