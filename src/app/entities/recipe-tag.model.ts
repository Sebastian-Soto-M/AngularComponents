import { Status } from '../status.enum';

export interface IRecipeTag {
  id?: number;
  name?: string;
  description?: string;
  status?: Status;
  typeName?: string;
  typeId?: number;
}

export class RecipeTag implements IRecipeTag {
  constructor(
    public id?: number,
    public name?: string,
    public description?: string,
    public status?: Status,
    public typeName?: string,
    public typeId?: number
  ) {}
}
