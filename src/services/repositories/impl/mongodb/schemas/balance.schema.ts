import { Schema, Document, Types } from 'mongoose';
import mongolDbConnection from '../../../../../common/persistence/mongodb.persistent';

interface Balance extends Document {
  user_id: Types.ObjectId;
  amount: number;
  createdAt: Date;
  updatedAt: Date;
}

const balanceSchema = new Schema<Balance>(
  {
    user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const BalanceModel = mongolDbConnection.model<Balance>(
  'Balance',
  balanceSchema
);

export default BalanceModel;
