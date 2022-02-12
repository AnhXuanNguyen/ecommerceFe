import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomChat} from "../../model/room/room-chat";
import {Shop} from "../../model/shop/shop";

@Injectable({
  providedIn: 'root'
})
export class RoomChatService {
  private url = environment.URL+'/rooms';
  constructor(private http: HttpClient) { }

  public createRoomChat(roomChatForm: any): Observable<RoomChat>{
    return this.http.post(`${this.url}`, roomChatForm);
  }
  public findRoomChatByShopIdAndUserId(shopId: any, userId: any): Observable<RoomChat>{
    return this.http.get(`${this.url}/${shopId}/${userId}`);
  }
  public findAllByShop(shop: Shop): Observable<any>{
    return this.http.put(`${this.url}/shop`, shop);
  }
}
