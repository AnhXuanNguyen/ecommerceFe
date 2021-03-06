import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ShopService} from "../../service/shop/shop.service";
import {ProductService} from "../../service/product/product.service";
import {Shop} from "../../model/shop/shop";
import {Product} from "../../model/product/product";
import {OrderService} from "../../service/order/order.service";
import {OrderProduct} from "../../model/order/order-product";
import {UserService} from "../../service/user/user.service";
import {RoomChatService} from "../../service/room/room-chat.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private shop: Shop | undefined = {};
  private products: Product[] = [];
  private totalPages = [];
  private page = 0;
  private orders: OrderProduct[] = [];
  private countMessage = 0;
  private username = window.sessionStorage.getItem("username");

  constructor(private roomChatService: RoomChatService,private activateRoute: ActivatedRoute, private shopService: ShopService, private productService: ProductService, private oderService: OrderService, private userService: UserService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const myShopId = paramMap.get('myShopId');
      this.shopService.findMyShopById(myShopId).subscribe((myShop) => {
        this.shop = myShop.shop;
        // @ts-ignore
        this.productService.getAllProductByShop(this.shop, this.page).subscribe((products) => {
          // @ts-ignore
          for (let i = 0; i < products.totalPages; i++){
            // @ts-ignore
            this.totalPages.push(i);
          }
          // @ts-ignore
          this.products = products.content;
        });
        this.oderService.findOrdersPendingByShopId(this.shop?.id).subscribe((orders) => {
          this.orders = orders;
        });
        this.roomChatService.findAllByShop(this.shop).subscribe((roomChats) => {
          for (let i = 0; i < roomChats.length; i++){
            for (let j = 0; j < roomChats[i].messages.length; j++){
              if (roomChats[i].messages[j].status == false && roomChats[i].messages[j].user.username != this.username){
                this.countMessage++;
              }
            }
          }
        });
      });
    });
  }
  public getOrders(): OrderProduct[] {
    return this.orders;
  }
  public getCountMessage(): any {
    return this.countMessage;
  }
  public getProducts(): Product []{
    return this.products;
  }
  public getShop(): any {
    // @ts-ignore
    return this.shop;
  }
  public getTotalPage(): any {
    return this.totalPages;
  }

  public nextPage(page: any) {
    this.page = page;
    this.productService.getAllProductByShop(this.shop, this.page).subscribe((products) => {
      this.products = products.content;
    });
  }

  public deleteProduct(id: any) {
    if (confirm("C?? ch???c mu???n x??a")){
      this.productService.deleteById(id).subscribe(() => {
        for (let i = 0; i < this.products.length; i++){
          if (this.products[i].id == id){
            this.products.splice(i, 1);
            return;
          }
        }
      });
    }
    else {
      return;
    }
  }

  public withdraw() {
    this.shopService.withdrawByShop(this.shop?.id).subscribe((shop) => {
      this.shop = shop;
      this.userService.infoUser().subscribe((user) => {
        // @ts-ignore
        window.sessionStorage.setItem("wallet", user.wallet);
      });
    });
  }
}
