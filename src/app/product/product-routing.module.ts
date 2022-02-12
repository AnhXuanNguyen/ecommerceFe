import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductComponent} from "./product/product.component";
import {CreateComponent} from "./create/create.component";
import {EditComponent} from "./edit/edit.component";
import {DetailComponent} from "./detail/detail.component";
import {MessageShopComponent} from "./message-shop/message-shop.component";

const routes: Routes = [
  {
    path: ':myShopId', component: ProductComponent
  },
  {
    path: 'create/:shopId', component: CreateComponent
  },
  {
    path: 'edit/:id', component: EditComponent
  },
  {
    path: 'detail/:id', component: DetailComponent
  },
  {
    path: 'message/:shopId', component: MessageShopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
