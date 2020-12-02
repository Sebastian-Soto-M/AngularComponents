import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/entities/account.model';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CartService } from 'src/app/service/cart.service';
import { CurrentCartService } from 'src/app/service/current-cart.service';
import { Status } from 'src/app/status.enum';
import { AddComponent } from './dialog/add/add.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  @Input() account!: Account;

  act = Status.ACTIVE;
  pen = Status.PENDING;

  visibilityAll = false;

  constructor(
    public cartService: CartService,
    public service: CurrentCartService,
    private dialog: MatDialog
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

  openAdd(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      panelClass: 'addDialog',
    });
  }
}
