import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/entities/account.model';
import { ICartIngredient } from 'src/app/entities/cart-ingredient.model';
import { CartService } from 'src/app/service/cart.service';
import { CurrentCartService } from 'src/app/service/current-cart.service';
import { Status } from 'src/app/status.enum';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewInit {
  @Input() account!: Account;

  visibleCartIngredients: ICartIngredient[] = [];

  requesting = false;
  visibilityAll = false;

  private _statusList = [Status.PENDING.toUpperCase()];

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
    this.service.ci$.subscribe(() => this._filterList());
  }

  ngAfterViewInit(): void {}

  closeCart(): void {
    this.service.close();
  }

  updateCartIngredients(item: ICartIngredient): void {
    console.warn(item);
    this._filterList();
  }

  toggleVisibility(): void {
    this.visibilityAll = !this.visibilityAll;
    this.visibilityAll
      ? this._statusList.push(Status.ACTIVE.toUpperCase())
      : this._statusList.pop();
    this._filterList();
  }

  private _filterList(): void {
    this.visibleCartIngredients = this.service.ci
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
