import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderProduct} from "../../model/order/order-product";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private url = environment.URL + "/orders";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };

  constructor(private http: HttpClient) { }

  public save(orderProductForm: any): Observable<any>{
    return this.http.post(this.url, orderProductForm, this.httpOptions);
  }
  public findOrdersPendingByShopId(id: any): Observable<any>{
    return this.http.get(`${this.url}/pending/${id}`);
  }
  public findAllOrdersByShopId(id: any, page: any): Observable<any>{
    return this.http.get(`${this.url}/all/${id}?page=${page}`);
  }
  public findOrdersConfirmByShopId(id: any): Observable<any>{
    return this.http.get(`${this.url}/confirm/${id}`);
  }
  public findOrdersCompleteByShopId(id: any): Observable<any>{
    return this.http.get(`${this.url}/complete/${id}`);
  }
  public confirmOrder(id: any): Observable<any>{
    return this.http.put(`${this.url}/confirm-order/${id}`, id);
  }
  public findOrderByUser(action: string): Observable<any>{
    return this.http.get(`${this.url}/user/${action}`, this.httpOptions);
  }
  public confirmByUser(id: any): Observable<OrderProduct>{
    return this.http.put(`${this.url}/user-complete/${id}`, id);
  }
  public cancelOrder(id: any): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
  public findById(id: any): Observable<OrderProduct>{
    return this.http.get(`${this.url}/${id}`);
  }
}
