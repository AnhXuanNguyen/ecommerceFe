import {ItemCart} from "../cart/item-cart";
import {User} from "../user/user";

export interface OrderProduct {
  id?: number;
  name?: string;
  phone?: string;
  address?: string;
  email?: string;
  moneyOrder?: number;
  enumOrder?: string;
  itemCarts?: ItemCart;
  user?: User;
}
