import { Component, OnInit } from '@angular/core';
import {ProductState} from "../../../shared/states/product-state";
import {Observable} from "rxjs";
import {Select} from "@ngxs/store";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  @Select(ProductState.getProductAmount) productsInCart$: Observable<number>;

  constructor() { }

  ngOnInit(): void {
  }

}
