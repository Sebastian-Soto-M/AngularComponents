import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/entities/account.model';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { ICart } from 'src/app/entities/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() account!: Account;

  cart: ICart;
  ci: ICartIngredient[] = [];

  visibilityAll$ = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit(): void {}

  closeCart(): void {}

  saveCart(): void {}

  openAddIngredients(): void {}

  private initializeCart(): void {}
}
