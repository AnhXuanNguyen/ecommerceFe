import {User} from "../user/user";

export interface Comment {
  id?: number;
  comment?: string;
  date?: string;
  score?: number;
  user?: User;
}
