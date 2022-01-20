import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Product } from "../../shared/models/product"
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private httpClient: HttpClient) { }

  public getCatalog(): Observable<Array<Product>> {
    return this.httpClient.get<Array<Product>>("assets/mock.json");
  }
}
