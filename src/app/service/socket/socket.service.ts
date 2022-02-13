import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment.prod";
import * as Stomp from 'stompjs';
import * as SockJs from 'sockjs-client';
import {Message} from "../../model/message/message";
import {MessageService} from "../message/message.service";
import {RoomChat} from "../../model/room/room-chat";
import {NotificationService} from "../notification/notification.service";
import {Notification} from "../../model/notification/notification";

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = environment.URL;
  private stompClient: any;
  private stompClients: any;
  private messages: Message[] = [];
  private notifications: Notification[] = [];
  private username = window.sessionStorage.getItem("username");
  constructor(private messageService: MessageService, private notificationService: NotificationService) {
  }
  public connect(roomChat: RoomChat): void {
    this.messageService.findAllByRoomChat(roomChat).subscribe((messages) => {
      this.messages = messages;
      for (let i = 0; i < this.messages.length; i++) {
        // @ts-ignore
        if (this.messages[i].status == false && this.messages[i].user.username != this.username) {
          this.messageService.read(messages[i], roomChat).subscribe();
        }
      }
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
  public connectNotification(): void {
    if (this.username != null){
      this.notificationService.findAllByUser().subscribe((notifications) => {
        this.notifications = notifications;
        const ws = new SockJs(`${this.url}/ws`);
        this.stompClients = Stomp.over(ws);
        this.stompClients.connect({}, () => {
          // @ts-ignore
          this.stompClients.subscribe('/topic/notifications/'+this.username, (notification) => {
            const notification1 = JSON.parse(notification.body);
            this.notifications.push(notification1);
          });
        });
      });
    }
  }
  public saveNotificationUsingWebSocket(notificationForm: any): void {
    this.stompClients.send('/app/notifications/'+notificationForm.user.username, {}, JSON.stringify(notificationForm));
  }
  public disconnectNotification(): void {
    if (this.stompClients != null){
      this.stompClients.disconnect();
    }
  }
  public getNotications(): Notification[] {
    return this.notifications;
  }
}
