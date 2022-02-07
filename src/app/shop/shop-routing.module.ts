import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CreateshopComponent} from "./createshop/createshop.component";
import {ShopComponent} from "./shop/shop.component";

const routes: Routes = [
  {
    path: 'create', component: CreateshopComponent
  },
  {
    path: 'info/:id', component: ShopComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
