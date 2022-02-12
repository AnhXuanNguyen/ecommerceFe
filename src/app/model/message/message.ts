import {User} from "../user/user";

export interface Message {
  id?: number;
  content?: string;
  date?: string;
  user?: User;
  status?: boolean;
}
