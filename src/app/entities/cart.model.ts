import { Moment } from 'moment';
import { Status } from '../status.enum';

export interface ICart {
  id?: number;
  created?: Moment;
  status?: Status;
  userLogin?: string;
  userId?: number;
}

export class Cart implements ICart {
  constructor(
    public id?: number,
    public created?: Moment,
    public status?: Status,
    public userLogin?: string,
    public userId?: number
  ) {}
}
