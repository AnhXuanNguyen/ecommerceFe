import {User} from "../user/user";
import {Shop} from "../shop/shop";
import {Message} from "../message/message";

export interface RoomChat {
  id?: number;
  name?: string;
  shop?: Shop;
  messages?: Message[];
  user?: User;
}

