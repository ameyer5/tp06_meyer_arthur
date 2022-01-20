import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AddProduct } from '../actions/product-add'
import { ProductStateModel } from './product-state-model';
import {RemoveProduct} from "../actions/product-remove";

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})

@Injectable()
export class ProductState {
  @Selector()
  static getProductAmount(state: ProductStateModel) {
    return state.products.length;
  }
  @Selector()
  static getProducts(state: ProductStateModel) {
    return state.products;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({ products: [...state.products, payload], });
  }

  @Action(RemoveProduct)
  remove(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: RemoveProduct
  ) {
    const state = getState();

    let index : number = state.products.indexOf(payload);
    if(index == -1)
      return;

    console.log(index);
    let newList = state.products;
    newList.splice(index, 1)
    patchState({ products: newList });
  }
}
