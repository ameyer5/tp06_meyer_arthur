import { Product } from '../models/product';

export class AddProduct {
  static readonly type = 'Add Product';

  constructor(public payload: Product) {}
}
