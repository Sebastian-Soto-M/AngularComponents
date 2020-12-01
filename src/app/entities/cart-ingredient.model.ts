import { Status } from '../status.enum';

export interface ICartIngredient {
  id?: number;
  cartId?: number;
  amount?: number;
  name?: string;
  unitAbbrev?: string;
  imageContentType?: string;
  image?: any;
  status?: Status;
}

export class CartIngredient implements ICartIngredient {
  constructor(
    public id?: number,
    public cartId?: number,
    public amount?: number,
    public name?: string,
    public unitAbbrev?: string,
    public imageContentType?: string,
    public image?: any,
    public status?: Status
  ) {}
}
