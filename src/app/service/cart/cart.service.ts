import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Cart} from "../../model/cart/cart";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private url = environment.URL+"/carts";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  public addCart(itemCartForm: any): Observable<any>{
    return this.http.put(`${this.url}/add`, itemCartForm, this.httpOptions);
  }
  public findByUser(): Observable<Cart>{
    return this.http.get(`${this.url}/by-user`, this.httpOptions);
  }
  public deleteItemCart(id: any): Observable<any>{
    return this.http.put(`${this.url}/item/${id}`,id, this.httpOptions);
  }
}
