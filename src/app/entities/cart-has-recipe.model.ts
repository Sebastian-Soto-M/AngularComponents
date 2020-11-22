import { Status } from '../status.enum';

export interface ICartHasRecipe {
  id?: number;
  status?: Status;
  recipeName?: string;
  recipeId?: number;
  cartId?: number;
}

export class CartHasRecipe implements ICartHasRecipe {
  constructor(
    public id?: number,
    public status?: Status,
    public recipeName?: string,
    public recipeId?: number,
    public cartId?: number
  ) {}
}
