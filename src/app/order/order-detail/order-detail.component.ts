import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderService} from "../../service/order/order.service";
import {OrderProduct} from "../../model/order/order-product";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {SocketService} from "../../service/socket/socket.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  private order: OrderProduct = {};
  private username: any = window.sessionStorage.getItem("username");
  private ownUser: User = {};

  constructor(private activateRoute: ActivatedRoute, private orderService: OrderService, private userService: UserService, private socketService: SocketService) {
    this.activateRoute.paramMap.subscribe((paraMap) => {
      const id = paraMap.get('id');
      this.orderService.findById(id).subscribe((order)=>{
        this.order = order;
        // @ts-ignore
        this.userService.findByShopId(this.order.itemCarts[0].product.shop.id).subscribe((user) => {
          this.ownUser = user;
          console.log(this.ownUser);
        });
      });
    });
  }

  ngOnInit(): void {
  }

  public getOrder(): any {
    return this.order;
  }
  public getUsername(): any {
    return this.username;
  }

  public completeOrder(id: any): void {
    this.orderService.confirmByUser(id).subscribe((order) => {
      this.order = order;
    });
  }
  public getOwnUser(): User {
    return this.ownUser;
  }

  public confirmOrder(id: any) {
    this.orderService.confirmOrder(id).subscribe((order) => {
      this.order = order;
      const notification = {
        // @ts-ignore
        content: this.order.itemCarts[0].product.shop.name+' đã xác nhận order của bạn',
        url: '/order/detail/'+this.order.id,
        user: this.order.user
      };
      this.socketService.saveNotificationUsingWebSocket(notification);
    });
  }
}
