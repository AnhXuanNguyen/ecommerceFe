import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {UserComponent} from "./user/user.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { MyOrderComponent } from './my-order/my-order.component';


@NgModule({
  declarations: [
    UserComponent,
    MyOrderComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class UserModule { }
