import {Types} from "mongoose";
export interface ISubscription {
  id: number | Types.ObjectId;
  code: string;
  user_id: number | Types.ObjectId;
  amount: number;
  cron: string;
  created_at: Date | null;
  updated_at: Date | null;
}
