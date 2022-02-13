import { Component, OnInit } from '@angular/core';
import {CartService} from "../../service/cart/cart.service";
import {ItemCartService} from "../../service/itemcart/item-cart.service";
import {ItemCart} from "../../model/cart/item-cart";
import {Cart} from "../../model/cart/cart";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {OrderService} from "../../service/order/order.service";
import {SocketService} from "../../service/socket/socket.service";
import {Shop} from "../../model/shop/shop";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  private itemCarts: ItemCart[] = [];
  private cart: Cart = {};
  private user: User = {};
  private message: any = null;
  private orderMessage = null;
  private shops: Shop[] = [];
  private orderForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl(''),
    phone: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    moneyOrder: new FormControl(),
    itemCarts: new FormControl()
  });

  constructor(private cartService: CartService, private itemCartService: ItemCartService, private userService: UserService, private orderService: OrderService, private socketService: SocketService) { }

  ngOnInit(): void {
    this.cartService.findByUser().subscribe((cart) => {
      this.cart = cart;
      // @ts-ignore
      window.sessionStorage.setItem("totalItem", this.cart.itemCarts?.length);
    });
    this.itemCartService.findAllItemCartByUser().subscribe((itemCarts) => {
      this.itemCarts = itemCarts;
    });
    this.userService.infoUser().subscribe((user) => {
      this.user = user;
      this.orderForm.value.name = this.user.name;
      this.orderForm.value.email = this.user.email;
      this.orderForm.value.phone = this.user.phone;
      this.orderForm.value.address = this.user.address;
    });
  }
  public getItemCarts(): any {
    return this.itemCarts;
  }
  public getCart(): any {
    return this.cart;
  }

  public changeQuantity(itemCart: any, event: Event) {
    // @ts-ignore
    if (event.target.value <= 0){
      this.removeItem(itemCart.id);
      return;
    }
    for (let i = 0; i < this.itemCarts.length; i++){
      if (itemCart.id == this.itemCarts[i].id){
        // @ts-ignore
        this.itemCarts[i].quantity = event.target.value;
      }
    }
    const itemCartForm = {
      product: itemCart.product,
      // @ts-ignore
      quantity: event.target.value,
      comment: ''
    };
    this.cartService.addCart(itemCartForm).subscribe((cart) =>{
      this.cart = cart;
    });
  }

  public removeItem(id: any) {
    this.cartService.deleteItemCart(id).subscribe((cart) => {
      this.cart = cart;
      for (let i = 0; i < this.itemCarts.length; i++){
        if (this.itemCarts[i].id == id){
          this.itemCarts.splice(i, 1);
          // @ts-ignore
          window.sessionStorage.setItem("totalItem", this.itemCarts.length);
          return;
        }
      }
    });
  }
  public closeNav() {
    // @ts-ignore
    document.getElementById("confirm").style.width = "0";
    // @ts-ignore
    document.getElementById("recharge").style.width = "0";
  }

  public openNav(): void {
    // @ts-ignore
    document.getElementById("confirm").style.width = "40%";
  }
  public getPayForm(): any {
    return this.orderForm.value;
  }

  public payCart(): void {
    // @ts-ignore
    if (this.user.wallet < this.cart.totalMoney){
      // @ts-ignore
      this.message = this.cart.totalMoney - this.user.wallet;
      return;
    }
    this.orderForm.value.moneyOrder = this.cart.totalMoney;
    this.orderForm.value.itemCarts = this.itemCarts;
    this.orderService.save(this.orderForm.value).subscribe((user)=>{
      this.user = user;
      // @ts-ignore
      window.sessionStorage.setItem("wallet", this.user.wallet);
      // @ts-ignore
      this.orderMessage = 'Đặt hàng thành công hãy chờ người bán xác nhận';
      for (let i = 0; i < this.itemCarts.length; i++) {
        let check = true;
        // @ts-ignore
        for (let j = 0; j < this.shops.length; j++) {
          // @ts-ignore
          if (this.itemCarts[i].product.shop.id == this.shops[j].id) {
            check = false;
          }
        }
        if (check) {
          // @ts-ignore
          this.shops.push(this.itemCarts[i].product.shop);
        }
      }
      for (let i = 0; i < this.shops.length; i++){
        this.userService.findByShopId(this.shops[i].id).subscribe((user) => {
          const notificationForm = {
            content: 'Có 1 order từ '+this.orderForm.value.name,
            url: '/order/'+ this.shops[i].id,
            user: user
          };
          this.socketService.saveNotificationUsingWebSocket(notificationForm);
        });
      }

      this.cartService.findByUser().subscribe((cart) => {
        this.cart = cart;
        // @ts-ignore
        window.sessionStorage.setItem("totalItem", cart.itemCarts?.length);
      });
      this.itemCartService.findAllItemCartByUser().subscribe((itemsCarts) => {
        this.itemCarts = itemsCarts;
      });
      this.closeNav();
    }, () => {
      // @ts-ignore
      this.orderMessage = 'Đặt hàng không thành công vui lòng kiểm tra lại';
    });
  }
  public getOrderMessage(): any {
    return this.orderMessage;
  }
  public getMessage(): any {
    return this.message;
  }

  public creditMoney() {
    // @ts-ignore
    document.getElementById("confirm").style.width = "0";
    // @ts-ignore
    document.getElementById("recharge").style.width = "25%";
  }

  public recharge(rechargeForm: NgForm): void {
    this.userService.recharge(rechargeForm.value).subscribe((user) => {
      console.log(user);
      this.user = user;
      this.message = null;
      // @ts-ignore
      window.sessionStorage.setItem("wallet", user.wallet);
      // @ts-ignore
      document.getElementById("recharge").style.width = "0";
      // @ts-ignore
      document.getElementById("confirm").style.width = "40%";
    });
  }
}
