import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import {ProductComponent} from "./product/product.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from "@angular/platform-browser";
import { CreateComponent } from './create/create.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { EditComponent } from './edit/edit.component';
import { DetailComponent } from './detail/detail.component';
import { MessageShopComponent } from './message-shop/message-shop.component';


@NgModule({
  declarations: [
    ProductComponent,
    CreateComponent,
    EditComponent,
    DetailComponent,
    MessageShopComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
