import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../model/category/category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.URL+'/categories';

  constructor(private http: HttpClient) { }
  public findAllCategories(): Observable<Category[]>{
    // @ts-ignore
    return this.http.get(this.url);
  }
  public findById(id: any): Observable<Category>{
    return this.http.get(`${this.url}/${id}`);
  }
}
