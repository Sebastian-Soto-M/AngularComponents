import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ICartHasIngredient } from '../entities/cart-has-ingredient.model';
import { ICartIngredient } from '../entities/cart-ingredient.model';
import { IIngredient } from '../entities/ingredient.model';
import { Status } from '../status.enum';
import { CartHasIngredientService } from './cart-has-ingredient.service';
import { IngredientService } from './ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class CartIngredientService {
  ci: ICartIngredient[] = [];
  constructor(
    private chiService: CartHasIngredientService,
    private iService: IngredientService
  ) {}

  create(ci: ICartIngredient): Observable<HttpResponse<ICartHasIngredient>> {
    return this.chiService.create(this.unmap(ci));
  }

  update(ci: ICartIngredient): Observable<HttpResponse<ICartHasIngredient>> {
    return this.chiService.update(this.unmap(ci));
  }

  toggleStatus(
    ci: ICartIngredient
  ): [ICartIngredient, Observable<HttpResponse<ICartHasIngredient>>] {
    ci.status =
      ci.status !== Status.PENDING.toUpperCase()
        ? (Status.PENDING.toUpperCase() as Status)
        : (Status.ACTIVE.toUpperCase() as Status);
    return [ci, this.chiService.update(this.unmap(ci))];
  }

  delete(ci: ICartIngredient): Observable<HttpResponse<ICartHasIngredient>> {
    return this.chiService.delete(ci.cartHasIngredientId);
  }

  map(i: IIngredient, chi: ICartHasIngredient): ICartIngredient {
    return {
      id: i.id,
      name: i.name,
      amount: chi.amount,
      image: i.image,
      imageContentType: i.imageContentType,
      unitAbbrev: i.unitAbbrev,
      cartId: chi.cartId,
      cartHasIngredientId: chi.id,
      status: chi.status,
    };
  }

  unmap(ci: ICartIngredient): ICartHasIngredient {
    return {
      id: ci.cartHasIngredientId,
      amount: ci.amount,
      status: ci.status,
      cartId: ci.cartId,
      ingredientName: ci.name,
      ingredientId: ci.id,
    };
  }
}
