import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { ICartHasIngredient } from '../entities/cart-has-ingredient.model';
import { ICartIngredient } from '../entities/cart-ingredient.model';
import { ICart } from '../entities/cart.model';
import { CartHasIngredientService } from './cart-has-ingredient.service';
import { CartIngredientService } from './cart-ingredient.service';
import { CartService } from './cart.service';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class CurrentCartService {
  cart: ICart;
  ci: ICartIngredient[] = [];
  cartInfo$: Observable<string>;
  stats$ = new BehaviorSubject<string>('0/0');
  ci$ = new Subject<ICartIngredient>();
  hasChanges$ = new Subject();
  changes: Observable<HttpResponse<ICartHasIngredient>>[] = [];

  constructor(
    private cartIngredientService: CartIngredientService,
    private chiService: CartHasIngredientService,
    private iService: IngredientService
  ) {}

  deleteCartIngredient(ci: ICartIngredient): void {
    this.changes.push(this.cartIngredientService.delete(ci));
    this.hasChanges$.next();
    this.ci.splice(
      this.ci.findIndex((x) => x.id === ci.id),
      1
    );
    this.ci$.next();
  }

  toggleCartIngredientStatus(ci: ICartIngredient): void {
    const updt = this.cartIngredientService.toggleStatus(ci);
    this.changes.push(updt[1]);
    this.hasChanges$.next();
  }

  setCart(c: ICart): void {
    this.cart = c;
    this.cartInfo$ = new Observable<string>((obs) => {
      setInterval(() => {
        obs.next(`Created ${this.cart.created.fromNow()}`);
      }, 1000);
    });
    this.setCartIngredients();
  }

  setCartIngredients(): void {
    const queries: Observable<ICartIngredient>[] = [];
    this.chiService.findByCart(this.cart.id).subscribe((response) => {
      if (response.body !== null) {
        response.body.forEach((chi) => {
          this.iService.find(chi.ingredientId).subscribe((ing) => {
            if (ing.body !== null) {
              let obs = of(this.cartIngredientService.map(ing.body, chi));
              obs.subscribe((x) => {
                this.ci.push(x);
                this.stats$.next(this.getFraction());
                this.ci.sort((a: ICartIngredient, b: ICartIngredient) => {
                  return a.name.localeCompare(b.name);
                });
              });
              queries.push(obs);
            }
          });
        });
      }
    });
    forkJoin(queries).subscribe();
  }

  addIngredients(ingredientList: ICartIngredient[]): void {
    ingredientList.forEach((ing) => {
      const chi = this.chiService.map(ing, this.cart.id);
      this.changes.push(this.chiService.create(chi));
      const info = this.cartIngredientService.map(ing, chi);
      this.ci$.next(info);
      this.hasChanges$.next();
    });
  }

  saveChanges(): void {
    const obs = forkJoin(this.changes);
    obs.subscribe();
  }

  updateCartIngredientAmount(ci: ICartIngredient): void {
    this.changes.push(this.chiService.update(ci));
    this.ci$.next(ci);
    this.hasChanges$.next();
  }

  initTasks(): void {
    this.ci$.subscribe((item) => {
      this.setStats();
      if (item) {
        this.ci.push(item);
      }
    });
  }

  setStats(): void {
    this.stats$.next(this.getFraction());
  }

  private getFraction(): string {
    return `${
      this.ci.filter((x) => {
        return x.status.toUpperCase() === 'ACTIVE';
      }).length
    }/${this.ci.length}`;
  }
}
