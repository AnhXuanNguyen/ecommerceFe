import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product/product";
import {CommentService} from "../../service/comment/comment.service";
import {Comment} from "../../model/comment/comment";
import {NgForm} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {CartService} from "../../service/cart/cart.service";
import {ShopService} from "../../service/shop/shop.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private product: Product = {};
  private mainImage: string = '';
  private comments: Comment[] = [];
  private pageComments = 0;
  private totalPageComments: number = 0;
  private user: User = {};
  private users: User[] = [];
  private scoreAvg: number = 0;
  private message: string = '';
  private ownerUser: User = {};

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService, private commentService: CommentService, private userService: UserService, private cartService: CartService, private shopService: ShopService, private router: Router) {
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.productService.findById(id).subscribe((product) => {
        this.product = product;
        this.findCommentByProduct();
        this.findListUser();
        this.findScoreAvg();
        this.findOwnerUserByShop();
        this.mainImage = product.images[0];
      });
    });
    this.userService.infoUser().subscribe((user) => {
      this.user = user;
      console.log(this.user);
    });
  }
  public findScoreAvg(): any {
    // @ts-ignore
    for (let i = 0; i < this.product.comments.length; i++){
      // @ts-ignore
      this.scoreAvg += this.product.comments[i].score;
    }
    // @ts-ignore
    this.scoreAvg = this.scoreAvg/this.product.comments?.length;
  }
  public getScoreAvg(): any {
    return this.scoreAvg.toFixed(2);
  }
  public getProduct(): any {
    return this.product;
  }

  public getMainImage(image: string): void {
    this.mainImage = image;
  }
  public findMainImage(): any {
    return this.mainImage;
  }
  public getComments(): any {
    return this.comments;
  }
  public findCommentByProduct(): void {
    this.commentService.getCommentByProduct(this.product, this.pageComments).subscribe((comments) => {
      const comments1 = comments.content;
      this.totalPageComments = comments.totalPages;
      for (let i = 0; i < comments1.length; i++){
        this.comments.push(comments1[i]);
      }
    });
  }

  public loadComments(): void {
    this.pageComments++;
    this.findCommentByProduct();
  }
  public getPageComment(): any {
    return this.pageComments;
  }
  public getTotalPageComments(): any {
    return this.totalPageComments;
  }

  public save(commentForm: NgForm) {
    if (commentForm.value.score == ''){
      commentForm.value.score = 0;
    }
    commentForm.value.product = this.product;
    commentForm.value.user = this.user;
    this.commentService.save(commentForm.value).subscribe((comment) => {
      this.comments.push(comment);
      commentForm.reset();
    });
  }
  public findListUser(): void {
    this.userService.findAllUserBuyProduct(this.product.id).subscribe((users) => {
      this.users = users;
    });
  }
  public checkComment(): boolean {
    for (let i = 0; i < this.comments.length; i++){
      // @ts-ignore
      if (this.user.id == this.comments[i].user.id){
        return false;
      }
    }
    for (let i = 0; i < this.users.length; i++){
      if (this.user.id == this.users[i].id){
        return true;
      }
    }
    return false;
  }

  public addCart() {
    const itemCartForm = {
      product: this.product,
      quantity: 1,
      comment: ''
    }
    this.cartService.addCart(itemCartForm).subscribe(()=>{
      this.message = 'Thêm '+this.product.name+' vào giỏ hàng thành công';
    });
  }
  public getMessage(): string {
    return this.message;
  }

  public addLoveShop() {
    const shopFollow = {
      shop: this.product.shop
    };
    this.shopService.followShop(shopFollow).subscribe((data) => {
      this.message = 'đã thêm '+this.product.shop?.name+' vào danh sách shop yêu thích';
    });
  }

  public buyNow() {
    const itemCartForm = {
      product: this.product,
      quantity: 1,
      comment: ''
    }
    this.cartService.addCart(itemCartForm).subscribe(()=>{
      this.router.navigateByUrl('/cart').then(() => {
        window.location.reload();
      });
    });
  }
  public findOwnerUserByShop(): void {
    this.userService.findByShopId(this.product.shop?.id).subscribe((user) => {
      this.ownerUser = user;
      console.log(this.ownerUser);
    });
  }
  public checkAction(): boolean {
    if (this.user.id == this.ownerUser.id){
      return false;
    }
    return true;
  }
}
