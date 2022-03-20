import {Types} from "mongoose";
export interface ISubscription {
  id: string | Types.ObjectId;
  code: string | Types.ObjectId;
  user_id: string | Types.ObjectId;
  amount: number;
  cron: string | Types.ObjectId;
  created_at: Date | null;
  updated_at: Date | null;
}
