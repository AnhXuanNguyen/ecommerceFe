import {ItemCart} from "./item-cart";
import firebase from "firebase/compat";
import User = firebase.User;

export interface Cart {
  id?: number;
  name?: string;
  totalMoney?: number;
  itemCarts?: ItemCart[];
  user?: User;
}
