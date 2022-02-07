import {Role} from "../role/role";
import {Myshop} from "../shop/myshop";

export interface User {
  id?: number;
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  wallet?: number;
  lockWallet?: number;
  address?: string;
  date?: string;
  username?: string;
  status?: boolean;
  shops?: Myshop[];
  role?: Role[];
}
