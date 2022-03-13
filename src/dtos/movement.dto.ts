import { MovementType } from '../common/enums/movement.type';

interface IMovementCreateDto {
  type: MovementType;
  user_id: number;
  amount: number;
}

export { IMovementCreateDto };
