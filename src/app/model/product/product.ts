import {Origin} from "../origin/origin";
import {Image} from "../image/image";
import {Category} from "../category/category";
import {Shop} from "../shop/shop";

export interface Product {
  id?: number;
  name?: string;
  price?: number;
  quantity?: number;
  countBuy?: number;
  description?: string;
  dayUpdate?: string;
  origin?: Origin;
  brand?: string;
  images?: Image[];
  categories?: Category[];
  shop?: Shop;
  comments?: Comment[];
}
