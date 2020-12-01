import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from '../app.constants';
import { ICartHasRecipe } from '../entities/cart-has-recipe.model';
import { createRequestOption } from '../util/request-util';

type EntityResponseType = HttpResponse<ICartHasRecipe>;
type EntityArrayResponseType = HttpResponse<ICartHasRecipe[]>;

@Injectable({ providedIn: 'root' })
export class CartHasRecipeService {
  public resourceUrl = SERVER_API_URL + 'api/cart-has-recipes';

  constructor(protected http: HttpClient) {}

  create(cartHasRecipe: ICartHasRecipe): Observable<EntityResponseType> {
    return this.http.post<ICartHasRecipe>(this.resourceUrl, cartHasRecipe, {
      observe: 'response',
    });
  }

  update(cartHasRecipe: ICartHasRecipe): Observable<EntityResponseType> {
    return this.http.put<ICartHasRecipe>(this.resourceUrl, cartHasRecipe, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ICartHasRecipe>(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ICartHasRecipe[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, {
      observe: 'response',
    });
  }

  findByCart(cartId: number): Observable<EntityArrayResponseType> {
    const options = createRequestOption({ ...{ 'cartId.equals': cartId } });
    return this.http.get<ICartHasRecipe[]>(this.resourceUrl, {
      params: options,
      observe: 'response',
    });
  }
}
