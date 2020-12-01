import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/entities/account.model';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CartService } from 'src/app/service/cart.service';
import { CurrentCartService } from 'src/app/service/current-cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() account!: Account;

  visibleCartIngredients: ICartIngredient[] = [];

  requesting = false;
  visibilityAll = false;

  constructor(
    public cartService: CartService,
    public service: CurrentCartService
  ) {}

  ngOnInit(): void {
    this.cartService
      .query({ ...{ 'userLogin.equals': this.account.login } })
      .subscribe((response) => {
        this.service.cart$.next(response.body[0]);
        this.service.loadCartCompleteIngredients();
      });
    this.service.visibility$.subscribe((x) => (this.visibilityAll = x));
  }

  closeCart(): void {
    this.service.close();
  }
}
