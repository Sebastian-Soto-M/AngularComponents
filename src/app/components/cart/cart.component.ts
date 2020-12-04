import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/entities/account.model';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { ICart } from 'src/app/entities/cart.model';
import { CartService } from 'src/app/service/cart.service';
import { CurrentCartService } from 'src/app/service/current-cart.service';
import { Status } from 'src/app/status.enum';
import { AddIngredientsComponent } from './dialog/add-ingredients/add-ingredients.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() account!: Account;

  act = Status.ACTIVE;
  pen = Status.PENDING;

  requesting = true;
  stats = '0/0';

  cart: ICart;

  visibilityAll$ = new BehaviorSubject<boolean>(true);

  constructor(
    public cartService: CartService,
    public service: CurrentCartService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.stats$.subscribe((x) => (this.stats = x));
    if (this.service.cart === undefined) this.initializeCart();
  }

  closeCart(): void {}

  saveCart(): void {}

  openAddIngredients(): void {
    this.dialog.open(AddIngredientsComponent);
  }

  toggleVisibility(): void {
    this.visibilityAll$.next(!this.visibilityAll$.value);
  }

  private initializeCart(): void {
    this.cartService
      .query({ ...{ 'userLogin.equals': this.account.login } })
      .subscribe((response) => {
        this.service.setCart(response.body[0]);
        this.requesting = false;
      });
  }
}
