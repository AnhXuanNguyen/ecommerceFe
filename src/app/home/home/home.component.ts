import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product/product";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private products: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.findAll().subscribe((products) => {
      // @ts-ignore
      this.products = products.content;
    });
  }
  public getProducts(): Product[]{
    return this.products;
  }
}
