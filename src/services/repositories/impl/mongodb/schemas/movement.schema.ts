import { Schema, Types, Document } from 'mongoose';
import { MovementType } from '../../../../../common/enums/movement.type';
import mongolDbConnection from '../../../../../common/persistence/mongodb.persistent';

interface Movement extends Document {
  user_id: Types.ObjectId;
  type: MovementType;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const movementSchema = new Schema<Movement>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: Number, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const MovementModel = mongolDbConnection.model<Movement>(
  'Movement',
  movementSchema
);
