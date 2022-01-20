import { Product } from '../models/product';

export class RemoveProduct {
  static readonly type = 'Remove Product';

  constructor(public payload: Product) {}
}
