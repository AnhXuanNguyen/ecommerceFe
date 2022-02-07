import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ShopService} from "../../service/shop/shop.service";
import {ProductService} from "../../service/product/product.service";
import {Shop} from "../../model/shop/shop";
import {Product} from "../../model/product/product";
import {Origin} from "../../model/origin/origin";
import {Category} from "../../model/category/category";
import {CategoryService} from "../../service/category/category.service";
import {OriginService} from "../../service/origin/origin.service";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  private shop: Shop = {};
  private origins: Origin[] = [];
  private categories: Category[] = [];
  private urlImage: string[] = [];
  private origin: Origin = {};
  private categoriesCheck: Category[] = [];
  private message = '';

  constructor(private activateRoute: ActivatedRoute, private shopService: ShopService, private productService: ProductService, private categoryService: CategoryService, private originService: OriginService, private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const shopId = paramMap.get('shopId');
      this.shopService.findShopById(shopId).subscribe((shop) => {
        this.shop = shop;
      });
    });
    this.categoryService.findAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.originService.getAllOrigins().subscribe((origins) => {
      this.origins = origins;
    });
  }

  public getOrigins(): Origin[]{
    return this.origins;
  }
  public getCategories(): Category[]{
    return this.categories;
  }

  public getImages(event: Event) {
    // @ts-ignore
    const files = event.target.files;
    this.onload(files);
  }
  public onload(files: any): void {
    console.log(files);
    for (let i = 0 ; i < files.length; i++){
      const id = Math.random().toString(36).substring(2);
      let ref = this.storage.ref(id);
      ref.put(files[i]).then((snapshot: any) => {
        return snapshot.ref.getDownloadURL();
      }).then((downloadURL: any) => {
        console.log(downloadURL);
        this.urlImage.push(downloadURL);
      });
    }
  }
  public getUrlImage(): string[] {
    return this.urlImage;
  }

  public deleteImage(image: string): void {
    for (let i = 0; i < this.urlImage.length; i++){
      if (this.urlImage[i] == image){
        this.urlImage.splice(i, 1);
        break;
      }
    }
  }

  public selectOrigin(event: any) {
    const id = event.target.value;
    if (id == -1){
      return;
    }
    this.originService.getById(id).subscribe((origin) => {
      this.origin = origin;
      console.log(this.origin);
    });
  }

  public selectCategories(id: any) {
    for (let i = 0; i < this.categoriesCheck.length; i++){
      if (this.categoriesCheck[i].id == id){
        this.categoriesCheck.splice(i, 1);
        console.log(this.categoriesCheck);
        return;
      }
    }
    this.categoryService.findById(id).subscribe((category) =>{
      this.categoriesCheck.push(category);
      console.log(this.categoriesCheck);
    });
  }

  public saveProduct(createProductForm: NgForm) {
    createProductForm.value.origin = this.origin;
    createProductForm.value.categories = this.categoriesCheck;
    createProductForm.value.images = this.urlImage;
    createProductForm.value.shop = this.shop;
    if (createProductForm.value.brand == ''){
      createProductForm.value.brand = 'no-brand';
    }
    console.log(createProductForm.value);
    this.productService.saveProduct(createProductForm.value).subscribe((product) => {
      this.message = "Thêm mới thành công";
    });
  }
  public getMessage(): string {
    return this.message;
  }
}
