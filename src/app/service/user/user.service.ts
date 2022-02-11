import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../../model/user/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.URL+'/users';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  public infoUser(): Observable<User> {
    return this.http.get(`${this.url}/info`, this.httpOptions);
  }
  public editUser(editUserForm: any): Observable<User> {
    return this.http.put(`${this.url}/edit`, editUserForm, this.httpOptions);
  }
  public recharge(rechargeForm: any): Observable<User> {
    return this.http.put(`${this.url}/recharge`, rechargeForm, this.httpOptions);
  }
  public changePassword(changePasswordForm: any): Observable<User>{
    return this.http.put(`${this.url}/change-password`, changePasswordForm, this.httpOptions);
  }
  public findUserByMyShopId(id: any): Observable<User>{
    return this.http.get(`${this.url}/user/${id}`);
  }
  public findAllUserBuyProduct(productId: any): Observable<any>{
    return this.http.get(`${this.url}/user-buyed/${productId}`);
  }
  public findByShopId(shopId: any): Observable<User>{
    return this.http.get(`${this.url}/user-shop/${shopId}`,);
  }
}
