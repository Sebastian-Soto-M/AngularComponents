import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICartHasIngredient } from '../entities/cart-has-ingredient.model';
import { ICartIngredient } from '../entities/cart-ingredient.model';
import { IIngredient } from '../entities/ingredient.model';
import { Status } from '../status.enum';
import { CartHasIngredientService } from './cart-has-ingredient.service';

@Injectable({
  providedIn: 'root',
})
export class CartIngredientService {
  constructor(private chiService: CartHasIngredientService) {}

  create(
    ci: ICartIngredient,
    cartId: number
  ): Observable<HttpResponse<ICartHasIngredient>> {
    return this.chiService.create({
      amount: ci.amount,
      status: ci.status,
      cartId: cartId,
      ingredientName: ci.name,
      ingredientId: ci.id,
    });
  }

  update(ci: ICartIngredient): Observable<HttpResponse<ICartHasIngredient>> {
    return this.chiService.update(ci);
  }

  toggleStatus(
    ci: ICartIngredient
  ): [ICartIngredient, Observable<HttpResponse<ICartHasIngredient>>] {
    ci.status =
      ci.status !== Status.PENDING.toUpperCase()
        ? (Status.PENDING.toUpperCase() as Status)
        : (Status.ACTIVE.toUpperCase() as Status);
    return [ci, this.chiService.update(ci)];
  }

  delete(ci: ICartIngredient): Observable<HttpResponse<ICartHasIngredient>> {
    return this.chiService.delete(ci.id);
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
      status: chi.status,
    };
  }
}
