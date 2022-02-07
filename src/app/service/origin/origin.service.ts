import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Origin} from "../../model/origin/origin";

@Injectable({
  providedIn: 'root'
})
export class OriginService {
  private url = environment.URL+'/origins';

  constructor(private http: HttpClient) { }

  public getAllOrigins(): Observable<Origin[]>{
    // @ts-ignore
    return this.http.get(this.url);
  }
  public getById(id: any): Observable<Origin>{
    return this.http.get(`${this.url}/${id}`);
  }
}
