import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {OrderService} from "../../service/order/order.service";
import {OrderProduct} from "../../model/order/order-product";
import {SocketService} from "../../service/socket/socket.service";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  private shopId: number = -1;
  private orders: OrderProduct[] = [];
  private page: number = 0;
  private totalPages: number[] = [];
  private action: string = '';
  private actions: string[] = [
    'Tất cả', 'Đang chờ', 'Xác nhận', 'Hoàn thành'
  ];

  constructor(private activateRoute: ActivatedRoute, private orderService: OrderService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      // @ts-ignore
      this.shopId = paramMap.get('shopId');
      this.findAllOrdersByShopId();
    });
  }
  public getOrders(): OrderProduct[]{
    return this.orders;
  }

  public getTotalPage(): any {
    return this.totalPages;
  }

  public nextPage(page: any) {
    this.orderService.findAllOrdersByShopId(this.shopId, page).subscribe((orders) => {
      this.orders = orders.content;
    });
  }
  public getAction(): string[]{
    return this.actions;
  }

  public findAction(event: any) {
    this.action = event.target.value;
    console.log(this.action);
    switch (this.action){
      case 'Tất cả': this.findAllOrdersByShopId(); break;
      case  'Đang chờ': this.findOrdersPendingByShopId(); break;
      case  'Xác nhận': this.findOrdersConfirmByShopId(); break;
      case  'Hoàn thành': this.findOrdersCompleteByShopId(); break;
    }
  }
  public getPage(): any {
    return this.page;
  }
  public findAllOrdersByShopId(): void {
    this.page = 0;
    this.orderService.findAllOrdersByShopId(this.shopId, this.page).subscribe((orders)=>{
      this.orders = orders.content;
      for (let i = 0; i < orders.totalPages; i++){
        this.totalPages[i] = i;
      }
    });
  }
  public findOrdersPendingByShopId(): void {
    // @ts-ignore
    this.page = null;
    this.orderService.findOrdersPendingByShopId(this.shopId).subscribe((orders) => {
      this.orders = orders;
    });
  }
  public findOrdersConfirmByShopId(): void {
    // @ts-ignore
    this.page = null;
    this.orderService.findOrdersConfirmByShopId(this.shopId).subscribe((orders) => {
      this.orders = orders;
    });
  }
  public findOrdersCompleteByShopId(): void {
    // @ts-ignore
    this.page = null;
    this.orderService.findOrdersCompleteByShopId(this.shopId).subscribe((orders) => {
      this.orders = orders;
    });
  }

  public confirmOrder(id: any) {
    this.orderService.confirmOrder(id).subscribe((order) => {
      for (let i = 0; i < this.orders.length; i++){
        if (this.orders[i].id == order.id){
          this.orders[i] = order;
        }
      }
      const notification = {
        // @ts-ignore
        content: order.itemCarts[0].product.shop.name+' đã xác nhận order của bạn',
        url: '/order/detail/'+order.id,
        user: order.user
      };
      this.socketService.saveNotificationUsingWebSocket(notification);
    });
  }

  public cancel(order: any) {
    this.orderService.cancelOrder(order.id).subscribe((message)=>{
      const notification = {
        content: order.itemCarts[0].product.shop.name+' đã hủy order của bạn với lý do hết hàng',
        url: '/user/my-order',
        user: order.user
      };
      this.socketService.saveNotificationUsingWebSocket(notification);
      switch (this.action){
        case  'Đang chờ': this.findOrdersPendingByShopId(); break;
        case  'Xác nhận': this.findOrdersConfirmByShopId(); break;
        case  'Hoàn thành': this.findOrdersCompleteByShopId(); break;
        default : this.findAllOrdersByShopId(); break;
      }
    });
  }
}
