import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Shop} from "../../model/shop/shop";
import {Observable} from "rxjs";
import {Product} from "../../model/product/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private url = environment.URL+'/products';
  constructor(private http: HttpClient) { }

  public getAllProductByShop(shop: any, page: any): Observable<any>{
    // @ts-ignore
    return this.http.put(`${this.url}/my-shop?page=${page}`, shop);
  }
  public saveProduct(productForm: any): Observable<Product>{
    return this.http.post(this.url, productForm);
  }
  public findAll(): Observable<Product[]>{
    // @ts-ignore
    return this.http.get(this.url);
  }
  public findById(id: any): Observable<any>{
    return this.http.get(`${this.url}/${id}`);
  }
  public editProduct(id: any, productEditForm: any): Observable<any>{
    return this.http.put(`${this.url}/${id}`, productEditForm);
  }
  public deleteById(id: any): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
