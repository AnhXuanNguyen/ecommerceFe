import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Myshop} from "../../model/shop/myshop";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private user: User = {};
  // @ts-ignore
  private file: File;
  private ref: any;
  private message: string = '';
  private messagePass: string = '';
  private messageEdit: string = '';
  private checkNewPassword: string = '';
  // @ts-ignore
  private shops: Myshop[];
  private editUserForm = new FormGroup({
    name: new FormControl('', Validators.required),
    avatar: new FormControl(''),
    email: new FormControl('', Validators.email),
    phone: new FormControl(''),
    address: new FormControl('')
  });


  constructor(private userService: UserService, private storage: AngularFireStorage, private router: Router) { }
  ngOnInit(): void {
    this.getInfoUser();
  }
  public getUser(): User {
    return this.user;
  }
  public getInfoUser(): void {
    this.userService.infoUser().subscribe((user) => {
      this.user = user;
      this.editUserForm.value.avatar = this.user.avatar;
      this.editUserForm.value.phone = this.user.phone;
      this.editUserForm.value.email = this.user.email;
      this.editUserForm.value.name = this.user.name;
      this.editUserForm.value.address = this.user.address;
      // @ts-ignore
      this.shops = this.user.shops;
      console.log(this.user);
      // @ts-ignore
      window.sessionStorage.setItem("wallet", this.user.wallet);
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
      this.editUserForm.value.avatar = url;
    })
  }

  public editUser() {
    console.log(this.editUserForm.value);
    this.userService.editUser(this.editUserForm.value).subscribe((user) => {
      this.user = user;
      console.log(this.user);
      // @ts-ignore
      window.sessionStorage.setItem("avatar", this.user.avatar);
      this.messageEdit = "Sửa Thông Tin Thành Công";
    });
  }
  public getEditUserForm(): FormGroup {
    return this.editUserForm;
  }

  public closeNav() {
    // @ts-ignore
    document.getElementById("recharge").style.width = "0";
  }

  public openNav(): void {
    // @ts-ignore
    document.getElementById("recharge").style.width = "25%";
  }

  public recharge(rechargeForm: NgForm): void {
    this.userService.recharge(rechargeForm.value).subscribe((user) => {
      console.log(user);
      // @ts-ignore
      window.sessionStorage.setItem("wallet", user.wallet);
      this.message = "nạp tiền thành công";
    });
  }
  public getMessage(): string {
    return this.message;
  }

  public showEditUserForm() {
    // @ts-ignore
    document.getElementById("changepass").style.display = "none";
    // @ts-ignore
    document.getElementById("editUser").style.display = "block";
  }

  public showChangePasswordForm() {
    // @ts-ignore
    document.getElementById("editUser").style.display = "none";
    // @ts-ignore
    document.getElementById("changepass").style.display = "block";
  }

  public changePassword(changePassForm: NgForm) {
    if (changePassForm.value.newPassword != this.checkNewPassword){
      this.messagePass = "Mật khẩu nhập lại không trùng";
    }
    else {
      this.userService.changePassword(changePassForm.value).subscribe((user)=>{
        this.messagePass = "Đổi mật khẩu thành công";
      });
    }
  }
  public getMessagePass():string{
    return this.messagePass;
  }

  public checkNewPass(event: Event) {
    // @ts-ignore
    this.checkNewPassword = event.target.value;
    console.log(this.checkNewPassword);
  }

  public closeForm(): void {
    // @ts-ignore
    document.getElementById("changepass").style.display = "none";
    this.messagePass = '';
    // @ts-ignore
    document.getElementById("editUser").style.display = "none";
    this.messageEdit = '';
  }
  public getMessageEdit(): string {
    return this.messageEdit;
  }
  public getMyShop(): Myshop[] {
    // @ts-ignore
    return this.shops;
  }
}
