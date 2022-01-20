import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {from, Observable} from "rxjs"
import { Product } from "../../../shared/models/product"
import {CatalogService} from "../catalog.service";
import {filter, map} from "rxjs/operators";
import {ProductState} from "../../../shared/states/product-state";
import {AddProduct} from "../../../shared/actions/product-add";
import {Store} from "@ngxs/store";

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})

export class CatalogComponent implements OnInit {
  constructor(private catalogService: CatalogService, private store: Store) {
    this.searchField = "";
  }

  @Input() searchField: string;
  @Input() numberField: number;
  catalog$: Observable<Array<Product>>;

  ngOnInit() {
    this.catalog$ = this.catalogService.getCatalog();
  }

  searchChange(obj: HTMLInputElement, e: Event) {
    this.searchField = obj.value;

    let articles = this.catalogService.getCatalog();
    let articlePipe =  articles.pipe(map(items => items.filter(product => product.name.includes(this.searchField))));
    this.catalog$ = articlePipe;
  }

  numberChange(obj: HTMLInputElement, e: Event) {
    this.numberField = parseInt(obj.value);

    let articles = this.catalogService.getCatalog();
    let articlePipe =  articles.pipe(map(items => items.filter(product => product.price <= this.numberField)));
    this.catalog$ = articlePipe;
  }

  addProductToCart(product: Product) {
    this.store.dispatch(new AddProduct(product));
  }

}
