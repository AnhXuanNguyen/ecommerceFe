import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {CategoryService} from "../../service/category/category.service";
import {OriginService} from "../../service/origin/origin.service";
import {ProductService} from "../../service/product/product.service";
import {Product} from "../../model/product/product";
import {ActivatedRoute} from "@angular/router";
import {Category} from "../../model/category/category";
import {Origin} from "../../model/origin/origin";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  private categories: Category [] = [];
  private origins: Origin[] = [];
  private message: string = '';
  private editProductForm = new FormGroup({
    name: new FormControl(Validators.required),
    price: new FormControl(Validators.required),
    brand: new FormControl(),
    origin: new FormControl(),
    categories: new FormControl(),
    description: new FormControl()
  });
  private id: number = -1;

  constructor(private activateRoute: ActivatedRoute, private categoryService: CategoryService, private originService: OriginService, private productService: ProductService) { }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe((paraMap) => {
      // @ts-ignore
      this.id = paraMap.get('id');
      this.productService.findById(this.id).subscribe((product) => {
        this.editProductForm.value.name = product.name;
        this.editProductForm.value.price = product.price;
        this.editProductForm.value.brand = product.brand;
        this.editProductForm.value.origin = product.origin;
        this.editProductForm.value.categories = [];
        this.editProductForm.value.description = product.description;
      });
    });
    this.categoryService.findAllCategories().subscribe((categories) => {
      this.categories = categories;
    });
    this.originService.getAllOrigins().subscribe((origins) => {
      this.origins = origins;
    });
  }

  public saveProduct() {
    this.productService.editProduct(this.id, this.editProductForm.value).subscribe((product) => {
      this.message = "Sửa "+ product.name+ " thành công";
    });
  }

  public selectOrigin(event: Event) {
    // @ts-ignore
    this.originService.getById(event.target.value).subscribe((origin) => {
      this.editProductForm.value.origin = origin;
    });
  }

  public getOrigins(): Origin[] {
    return this.origins;
  }

  public getCategories(): Category[] {
    return this.categories;
  }

  public selectCategories(id: any): void {
    for (let i = 0; i < this.editProductForm.value.categories.length; i++){
      if (this.editProductForm.value.categories[i].id == id){
        this.editProductForm.value.categories.splice(i, 1);
        return;
      }
    }
    this.categoryService.findById(id).subscribe((category) =>{
      this.editProductForm.value.categories.push(category);
    });
  }
  public getProduct(): Product {
    return this.editProductForm.value;
  }
  public getMessage(): string {
    return this.message;
  }
}
