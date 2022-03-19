import { Types } from 'mongoose';
import { ISubscription } from './domain/subscription';

export interface ISubscriptionRepository {
  all(): Promise<ISubscription[]>;
  find(id: number | Types.ObjectId): Promise<ISubscription | null>;
  findByUserIdAndCode(
    user_id: number | Types.ObjectId,
    code: string
  ): Promise<ISubscription | null>;
  store(entry: ISubscription): Promise<void>;
  update(entry: ISubscription): Promise<void>;
  remove(id: number | Types.ObjectId): Promise<void>;
}
