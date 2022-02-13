import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Shop} from "../../model/shop/shop";
import {ShopService} from "../../service/shop/shop.service";
import {RoomChatService} from "../../service/room/room-chat.service";
import {RoomChat} from "../../model/room/room-chat";
import {SocketService} from "../../service/socket/socket.service";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-message-shop',
  templateUrl: './message-shop.component.html',
  styleUrls: ['./message-shop.component.scss']
})
export class MessageShopComponent implements OnInit {
  private shop: Shop = {};
  private roomChats: RoomChat[] = [];
  private user: User = {};
  private roomChat: any = null;

  constructor(private userService: UserService,private activateRoute: ActivatedRoute, private shopService: ShopService, private roomChatService: RoomChatService, public socketService: SocketService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const shopId = paramMap.get('shopId');
      this.shopService.findShopById(shopId).subscribe((shop)=>{
        this.shop = shop;
        this.roomChatService.findAllByShop(this.shop).subscribe((roomChats) => {
          this.roomChats = roomChats;
        });
      });
      this.userService.findByShopId(shopId).subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
    });
  }
  public getRoomChats(): any[]{
    return this.roomChats;
  }
  public getShop(): Shop {
    return this.shop;
  }

  public getMessage(roomChat: any) {
    this.roomChat = roomChat;
    this.socketService.disconnect();
    this.socketService.connect(this.roomChat);
  }
  public checkUser(username: any): boolean {
    if (this.user.username == username){
      return true;
    }
    return false;
  }
  public getRoomChat(): any {
    return this.roomChat;
  }

  public save(messageForm: NgForm) {
    if (this.roomChat != null){
      messageForm.value.user = this.user;
      messageForm.value.roomChat = this.roomChat;
      console.log(messageForm.value);
      this.socketService.saveMessageUsingWebSocket(this.roomChat,messageForm.value);
      messageForm.reset();
    }
  }
}
