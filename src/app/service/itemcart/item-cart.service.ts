import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ItemCart} from "../../model/cart/item-cart";

@Injectable({
  providedIn: 'root'
})
export class ItemCartService {
  private url = environment.URL+'/item-carts';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  public findAllItemCartByUser(): Observable<any>{
    return this.http.get(`${this.url}/find-all`, this.httpOptions);
  }
}
