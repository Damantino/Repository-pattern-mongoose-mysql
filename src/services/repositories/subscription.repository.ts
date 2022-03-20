import { Types } from 'mongoose';
import { ISubscription } from './domain/subscription';

export interface ISubscriptionRepository {
  all(): Promise<ISubscription[]>;
  find(id: string): Promise<ISubscription | null>;
  findByUserIdAndCode(
    user_id: string,
    code: string
  ): Promise<ISubscription | null>;
  store(entry: ISubscription): Promise<void>;
  update(entry: ISubscription): Promise<void>;
  remove(id: string): Promise<void>;
}
