import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Account } from 'src/app/entities/account.model';
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
    if (this.service.cart === undefined) {
      this.initializeCurrentCartService();
    }
  }

  closeCart(): void {
    this.service.closeCart();
  }

  openAdd(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      panelClass: 'addDialog',
    });
  }

  private initializeCurrentCartService() {
    this.cartService
      .query({ ...{ 'userLogin.equals': this.account.login } })
      .subscribe((response) => {
        this.service.cart$.next(response.body[0]);
        this.service.loadCartCompleteIngredients();
      });

    this.service.visibility$.subscribe((x) => (this.visibilityAll = x));

    this.service.cart$.subscribe((c) => this.service.setCart(c));

    this.service.ci$.subscribe((ci) =>
      this.service.insertNewCartIngredient(ci)
    );

    this.service.visibility$.subscribe((viewAll) =>
      this.service.setVisibleItems(viewAll)
    );
  }
}
