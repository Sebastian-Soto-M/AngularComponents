import { Status } from '../status.enum';

export interface IIngredient {
  id?: number;
  name?: string;
  description?: string;
  unitAbbrev?: string;
  imageContentType?: string;
  image?: any;
  status?: Status;
}

export class Ingredient implements IIngredient {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public unitAbbrev?: string,
    public imageContentType?: string,
    public image?: any,
    public status?: Status
  ) {}
}
