import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user/user.service";
import {User} from "../../model/user/user";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private avatar = window.sessionStorage.getItem("avatar");
  private role = window.sessionStorage.getItem("role");
  private name = window.sessionStorage.getItem("name");
  private totalItem = window.sessionStorage.getItem("totalItem");
  private wallet = window.sessionStorage.getItem("wallet");

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  public getAvatar(): string | null {
    return this.avatar;
  }
  public getName(): string | null {
    return this.name;
  }

  public getRole(): string | null {
    return this.role;
  }
  public getTotalItem(): string | null{
    return this.totalItem;
  }
  public getWallet(): string | null{
    return this.wallet;
  }

  public closeNav() {
    // @ts-ignore
    document.getElementById("mySidenav").style.width = "0";
  }

  public openNav(): void {
    // @ts-ignore
    document.getElementById("mySidenav").style.width = "250px";
  }

  public logOut() {
    this.authService.logOut().subscribe(()=>{
      window.sessionStorage.clear();
      this.router.navigateByUrl('/home').then(() => {
        window.location.reload();
      });
    }, (error => {
      console.log(error);
    }));
  }
}
