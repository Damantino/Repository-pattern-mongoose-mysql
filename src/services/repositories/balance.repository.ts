import { Types } from 'mongoose';
import { IBalance } from './domain/balance';

export interface IBalanceRepository {
  find(id: number | Types.ObjectId): Promise<IBalance | null>;
  findByUserId(userId: number | Types.ObjectId): Promise<IBalance | null>;
  all(): Promise<IBalance[]>;
  store(entry: IBalance): Promise<void>;
  update(entry: IBalance): Promise<void>;
  remove(id: number | Types.ObjectId): Promise<void>;
}
