import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../../model/notification/notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = environment.URL+'/notifications';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.sessionStorage.getItem('token')
    })
  };
  constructor(private http: HttpClient) { }
  public findAllByUser(): Observable<any>{
    return this.http.get(this.url, this.httpOptions);
  }
  public deleteNotification(id: any): Observable<any>{
    return this.http.delete(`${this.url}/${id}`);
  }
}
