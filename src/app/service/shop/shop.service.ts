import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment.prod";
import {Observable} from "rxjs";
import {Shop} from "../../model/shop/shop";
import {Myshop} from "../../model/shop/myshop";

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  private url = environment.URL+'/shops';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  public createShop(createShopForm: any): Observable<Shop>{
    return this.http.post(this.url, createShopForm, this.httpOptions);
  }
  public findMyShopById(id: string | null): Observable<Myshop>{
    return this.http.get(`${this.url}/${id}`);
  }
  public findShopById(id: any): Observable<Shop>{
    return this.http.get(`${this.url}/shop/${id}`);
  }
  public followShop(shopForm: any): Observable<Myshop>{
    return this.http.put(`${this.url}/follow`,shopForm, this.httpOptions);
  }
  public withdrawByShop(id: any): Observable<Shop>{
    return this.http.put(`${this.url}/withdraw/${id}`, id, this.httpOptions);
  }
}
