import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product/product";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  private product: Product = {};
  private mainImage: string = '';

  constructor(private activateRoute: ActivatedRoute, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paramMap: ParamMap) => {
      const id = paramMap.get('id');
      this.productService.findById(id).subscribe((product) => {
        this.product = product;
        console.log(this.product);
        this.mainImage = product.images[0];
        console.log(this.mainImage);
      });
    });
  }
  public getProduct(): any {
    return this.product;
  }

  public getMainImage(image: string): void {
    this.mainImage = image;
  }
  public findMainImage(): any {
    return this.mainImage;
  }
}
