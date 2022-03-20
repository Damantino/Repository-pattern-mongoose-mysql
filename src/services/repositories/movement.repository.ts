import { Types } from 'mongoose';
import { IMovement } from './domain/movement';

export interface IMovementRepository {
  find(id: string): Promise<IMovement | null>;
  all(): Promise<IMovement[]>;
  store(entry: IMovement): Promise<void>;
  update(entry: IMovement): Promise<void>;
  remove(id: string): Promise<void>;
}
