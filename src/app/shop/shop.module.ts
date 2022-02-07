import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import {ShopComponent} from "./shop/shop.component";
import {CreateshopComponent} from "./createshop/createshop.component";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ShopComponent,
    CreateshopComponent
  ],
    imports: [
        CommonModule,
        ShopRoutingModule,
        FormsModule
    ]
})
export class ShopModule { }
