import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import {HttpClient} from "@angular/common/http";
import {RoomChat} from "../../model/room/room-chat";
import {Observable} from "rxjs";
import {Message} from "../../model/message/message";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private url = environment.URL + '/messages';
  constructor(private http: HttpClient) { }

  public findAllByRoomChat(roomChat: RoomChat): Observable<any>{
    return this.http.put(`${this.url}/room-chat`, roomChat);
  }
  public save(messageForm: any): Observable<Message>{
    return this.http.post(this.url, messageForm);
  }
  public read(message: Message, roomChat: RoomChat): Observable<any>{
    return this.http.put(`${this.url}/read/${roomChat.id}`, message);
  }
}
