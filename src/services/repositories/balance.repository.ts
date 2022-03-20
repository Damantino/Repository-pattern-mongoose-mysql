import { Types } from 'mongoose';
import { IBalance } from './domain/balance';

export interface IBalanceRepository {
  find(id: string): Promise<IBalance | null>;
  findByUserId(userId: string): Promise<IBalance | null>;
  all(): Promise<IBalance[]>;
  store(entry: IBalance): Promise<void>;
  update(entry: IBalance): Promise<void>;
  remove(id: string): Promise<void>;
}
