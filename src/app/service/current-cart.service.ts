import {HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, of, Subject} from 'rxjs';
import {ICartHasIngredient} from '../entities/cart-has-ingredient.model';
import {ICartIngredient} from '../entities/cart-ingredient.model';
import {ICart} from '../entities/cart.model';
import {CartHasIngredientService} from './cart-has-ingredient.service';
import {CartIngredientService} from './cart-ingredient.service';
import {IngredientService} from './ingredient.service';

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
    private ciService: CartIngredientService,
    private chiService: CartHasIngredientService,
    private iService: IngredientService
  ) {
  }

  deleteCartIngredient(ci: ICartIngredient): void {
    this.changes.push(this.ciService.delete(ci));
    this.hasChanges$.next();
    this.ci.splice(
      this.ci.findIndex((x) => x.id === ci.id),
      1
    );
    this.ci$.next();
  }

  toggleCartIngredientStatus(ci: ICartIngredient): void {
    const updt = this.ciService.toggleStatus(ci);
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
              const obs = of(this.ciService.map(ing.body, chi));
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

  addIngredients(ciList: ICartIngredient[]): void {
    ciList.forEach((ci) => {
      const current = this.ci.find((fci) => fci.id === ci.id);
      if (current) {
        current.amount = current.amount + ci.amount;
        console.warn(current);
        this.changes.push(this.ciService.update(current));
        this.ci$.next(ci);
      } else {
        this.changes.push(this.ciService.create(ci));
        this.ci$.next(ci);
      }
      this.hasChanges$.next();
    });
  }

  saveChanges(): void {
    const obs = forkJoin(this.changes);
    obs.subscribe();
  }

  updateCartIngredientAmount(ci: ICartIngredient): void {
    this.changes.push(this.chiService.update(this.chiService.map(ci)));
    this.hasChanges$.next();
  }

  initTasks(): void {
    this.ci$.subscribe((ci) => {
      this.setStats();
      if (ci && !this.ci.find((fci) => fci.id === ci.id)) {
        this.ci.push(ci);
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
