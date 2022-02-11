import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../model/product/product";
import {Observable} from "rxjs";
import {Comment} from "../../model/comment/comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = environment.URL + "/comments";
  constructor(private http: HttpClient) { }
  public getCommentByProduct(product: any, page: any): Observable<any> {
    return this.http.put(`${this.url}/page?page=${page}`, product);
  }
  public save(commentForm: any): Observable<Comment> {
    return this.http.post(this.url, commentForm);
  }
}
