import { MovementType } from '../common/enums/movement.type';

interface IMovementCreateDto {
  type: MovementType;
  user_id: string;
  amount: number;
}

export { IMovementCreateDto };
