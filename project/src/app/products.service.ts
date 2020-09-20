import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Product } from './product/product';

@Injectable()
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() : Observable<Product[]> {
    return this.http.get<Product[]>('https://angular-test.blabs.us');
  }

  addProduct(product:Product) : Observable<Product[]> {
    return this.http.post<Product[]>(`https://angular-test.blabs.us`, product );
  }

   deleteProduct(id:number) : Observable<Product[]> {
    return this.http.get<Product[]>(`https://angular-test.blabs.us?id=${id}`);
  }

}