import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {Myshop} from "../../model/shop/myshop";
import {ShopService} from "../../service/shop/shop.service";
import {UserService} from "../../service/user/user.service";
import {Product} from "../../model/product/product";
import {ProductService} from "../../service/product/product.service";
import {CartService} from "../../service/cart/cart.service";
import {ItemCartService} from "../../service/itemcart/item-cart.service";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  private myShop: Myshop = {};
  private usernameOwnerShop: string | undefined = '';
  private username = window.sessionStorage.getItem('username');
  private products: Product[] = [];
  private page = 0;
  private totalPages = [];
  private message = null;

  constructor(private activateRoute: ActivatedRoute, private shopService: ShopService, private userService: UserService, private productService: ProductService, private cartService: CartService, private itemCartService: ItemCartService) {
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.shopService.findMyShopById(id).subscribe((data) => {
        this.myShop = data;
        this.productService.getAllProductByShop(this.myShop.shop, this.page).subscribe((products) => {
          // @ts-ignore
          this.products = products.content;
          for (let i = 0; i < products.totalPages; i++){
            // @ts-ignore
            this.totalPages.push(i);
          }
        });
        this.userService.findUserByMyShopId(this.myShop.id).subscribe((data) => {
          this.usernameOwnerShop = data.username;
        });
      });
    });
  }
  public checkUserNameOwnerShop(): boolean {
    if (this.username == this.usernameOwnerShop){
      return true;
    }
    return false;
  }
  public getMyShop(): any{
    return this.myShop;
  }
  public getProducts(): any{
    return this.products;
  }
  public getTotalPage(): any {
    return this.totalPages;
  }

  public nextPage(page: any) {
    this.productService.getAllProductByShop(this.myShop.shop, page).subscribe((products) => {
      this.products = products;
    });
  }

  public addToMyCart(product: any) {
    const addCartForm = {
      product: product,
      quantity: 1,
      comment: ''
    };
    this.cartService.addCart(addCartForm).subscribe(() => {
      // @ts-ignore
      this.message = `thêm ${product.name} vào giỏ hàng thành công`;
      this.itemCartService.findAllItemCartByUser().subscribe((itemCarts) => {
        window.sessionStorage.setItem("totalItem", itemCarts.length);
      });
    });
  }
  public getMessage(): any {
    return this.message;
  }

  public addLoveShop() {
    const shopFollow = {
      shop: this.myShop.shop
    };
    this.shopService.followShop(shopFollow).subscribe((data) => {
      console.log(data);
    });
  }
}
