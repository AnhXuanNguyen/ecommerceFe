import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';
import {Message} from "../../model/message/message";
import {MessageService} from "../message/message.service";
import {RoomChat} from "../../model/room/room-chat";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = environment.URL;
  private stompClient: any;
  private messages: Message[] = [];
  constructor(private messageService: MessageService) {
  }
  public connect(roomChat: RoomChat){
    this.messageService.findAllByRoomChat(roomChat).subscribe((messages) => {
      this.messages = messages;
      const ws = new SockJs(`${this.url}/ws`);
      this.stompClient = Stomp.over(ws);
      this.stompClient.connect({}, ()=>{
        // @ts-ignore
        this.stompClient.subscribe('/topic/messages/'+roomChat.id, (message) => {
          const message1 = JSON.parse(message.body);
          this.messages.push(message1);
        });
      });
    });
  }
  public getMessages(): any {
    return this.messages;
  }
  public disconnect(): void {
    if (this.stompClient != null){
      this.stompClient.disconnect();
    }
  }
  public saveMessageUsingWebSocket(roomChat: RoomChat ,messageForm: any): void {
    this.stompClient.send('/app/messages/'+roomChat.id, {}, JSON.stringify(messageForm));
  }
}
