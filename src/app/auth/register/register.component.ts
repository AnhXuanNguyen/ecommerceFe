import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../service/auth/auth.service";
import {User} from "../../model/user/user";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private message: string = '';
  private password: string = '';
  private user: User = {};

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  public register(registerForm: NgForm): void {
    if (registerForm.value.password == this.password){
      this.authService.register(registerForm.value).subscribe((data) => {
        this.message = 'Đăng ký thành công';
        this.user = data;
        console.log(this.user);
      });
    }
    else {
      this.message = 'Mật khẩu không trùng nhau';
    }
  }
  public getMessage(): string {
    return this.message;
  }

  public getConfirmPassword(event: Event): void {
    // @ts-ignore
    this.password = event.target.value;
  }
}
