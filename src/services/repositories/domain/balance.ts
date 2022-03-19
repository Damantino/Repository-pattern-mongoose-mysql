import {Types} from "mongoose";
export interface IBalance {
  id: number | Types.ObjectId;
  user_id: number | Types.ObjectId;
  amount: number;
  created_at: Date | null;
  updated_at: Date | null;
}
