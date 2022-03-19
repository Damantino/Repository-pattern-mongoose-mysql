import {Types} from "mongoose";
import { MovementType } from '../../../common/enums/movement.type';

export interface IMovement {
  id: number | Types.ObjectId;
  user_id: number | Types.ObjectId;
  type: MovementType;
  amount: number;
  created_at: Date | null;
  updated_at: Date | null;
}
