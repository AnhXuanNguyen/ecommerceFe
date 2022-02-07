import {Product} from "../product/product";

export interface ItemCart {
  id?: number;
  product?: Product;
  quantity?: number;
  date?: string;
  comment?: string;
  status?: boolean;
}
