import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Jwtresponse} from "../../model/jwt/jwtresponse";
import {User} from "../../model/user/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.URL+'/auth';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }

  public login(loginForm: any): Observable<Jwtresponse> {
    return this.http.post(`${this.url}/login`, loginForm);
  }
  public register(registerForm: any): Observable<User>{
    return this.http.post(`${this.url}/register`, registerForm);
  }
  public logOut(): Observable<any>{
    return this.http.get(`${this.url}/logout`, this.httpOptions);
  }
}
