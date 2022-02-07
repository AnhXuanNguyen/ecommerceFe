import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AngularFireStorage, AngularFireStorageReference} from "@angular/fire/compat/storage";
import {ShopService} from "../../service/shop/shop.service";

@Component({
  selector: 'app-createshop',
  templateUrl: './createshop.component.html',
  styleUrls: ['./createshop.component.scss']
})
export class CreateshopComponent implements OnInit {
  // @ts-ignore
  private file: File;
  private ref: AngularFireStorageReference | undefined;
  private avatar: string ='';
  private message: string = '';

  constructor(private storage: AngularFireStorage, private shopService: ShopService) { }

  ngOnInit(): void {
  }

  public createShop(createShopForm: NgForm) {
    createShopForm.value.avatar = this.avatar;
    this.shopService.createShop(createShopForm.value).subscribe((shop)=>{
      console.log(shop);
      if (shop != null){
        this.message = "Tạo shop thành công";
        window.sessionStorage.setItem("role", "ROLE_PROVIDER");
        return;
      }
      this.message = "Bạn không phải vip hoặc đã tạo đủ 5 shop"
    });
  }
  public getAvatar(event: Event): void {
    // @ts-ignore
    this.file = event.target.files[0];
    console.log(this.file);
    this.onload();
  }
  public onload(): void {
    const id = Math.random().toString(36).substring(2);
    this.ref = this.storage.ref(id);
    this.ref.put(this.file).then((snapshot: any) => {
      return snapshot.ref.getDownloadURL();
    }).then((url: string) => {
      this.avatar = url;
      console.log(this.avatar);
    });
  }
  public findAvatar(): string {
    return this.avatar;
  }
  public getMessage(): string {
    return this.message;
  }
}
