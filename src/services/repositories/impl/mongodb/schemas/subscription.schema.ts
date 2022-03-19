import { Schema, Document } from 'mongoose';
import mongolDbConnection from '../../../../../common/persistence/mongodb.persistent';

interface Subscription extends Document {
  code: string;
  amount: number;
  cron?: string;
  createdAt: Date;
  updatedAt: Date;
}

const subscriptionSchema = new Schema<Subscription>(
  {
    code: { type: String, required: true },
    amount: { type: Number, required: true },
    cron: { type: String },
  },
  { timestamps: true }
);

export const SubscriptionModel = mongolDbConnection.model<Subscription>(
  'Subscription',
  subscriptionSchema
);
