import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserComponent} from "./user/user.component";
import {MyOrderComponent} from "./my-order/my-order.component";

const routes: Routes = [
  {
    path: 'info', component: UserComponent
  },
  {
    path: 'my-order', component: MyOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
