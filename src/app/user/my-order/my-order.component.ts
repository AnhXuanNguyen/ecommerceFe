import { Component, OnInit } from '@angular/core';
import {OrderService} from "../../service/order/order.service";
import {OrderProduct} from "../../model/order/order-product";

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {
  private orders: OrderProduct[] = [];
  private actions: string [] = [
    'Tất cả', 'Đang chờ', 'Đã mua', 'Đã xác nhận'
  ];

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.findOrderByUser(this.actions[0]).subscribe((orders) => {
      this.orders = orders;
    });
  }
  public getAction(): string[] {
    return this.actions;
  }
  public getOrders(): OrderProduct[]{
    return this.orders;
  }

  public confirmOrder(id: any) {
    this.orderService.confirmByUser(id).subscribe((orderProduct) =>{
      for (let i = 0; i < this.orders.length; i++){
        if (this.orders[i].id == orderProduct.id){
          this.orders[i] = orderProduct;
          console.log(this.orders[i]);
          return;
        }
      }
    });
  }

  public findAction(event: Event) {
      // @ts-ignore
    this.orderService.findOrderByUser(event.target.value).subscribe((orders) => {
      this.orders = orders;
    });
  }
}
