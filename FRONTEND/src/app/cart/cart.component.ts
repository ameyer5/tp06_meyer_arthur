import { Component, OnInit } from '@angular/core';
import {Select, Store} from '@ngxs/store';
import { Product } from '../../../shared/models/product';
import { ProductState } from '../../../shared/states/product-state';
import {Observable} from "rxjs";
import {AddProduct} from "../../../shared/actions/product-add";
import {RemoveProduct} from "../../../shared/actions/product-remove";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // @ts-ignore
  @Select(ProductState.getProducts) productList$: Observable<Product[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

  removeProductFromCart(product: Product) {
    this.store.dispatch(new RemoveProduct(product));
}
}
