import {Types} from "mongoose";
export interface IBalance {
  id: string | Types.ObjectId;
  user_id: string | Types.ObjectId;
  amount: number;
  created_at: Date | null;
  updated_at: Date | null;
}
