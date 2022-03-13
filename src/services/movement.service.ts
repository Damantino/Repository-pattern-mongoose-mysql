import { IMovementRepository } from './repositories/movement.repository';
import { IBalanceRepository } from './repositories/balance.repository';
import { IMovement } from './repositories/domain/movement';
import { IMovementCreateDto } from '../dtos/movement.dto';
import { MovementType } from '../common/enums/movement.type';
import { ApplicationException } from '../common/exceptions/application.exception';
import { IBalance } from './repositories/domain/balance';

export class MovementService {
  constructor(
    private readonly movementRepository: IMovementRepository,
    private readonly balanceRepository: IBalanceRepository
  ) {}

  public async find(id: number): Promise<IMovement | null> {
    return await this.movementRepository.find(id);
  }

  public async all(): Promise<IMovement[]> {
    return await this.movementRepository.all();
  }

  public async store(entry: IMovementCreateDto): Promise<void> {
    const balance = await this.balanceRepository.findByUserId(entry.user_id);

    if (entry.type === MovementType.income) {
      await this.income(entry, balance);
    } else if (entry.type === MovementType.outcome) {
      await this.outcome(entry, balance);
    } else {
      throw new ApplicationException('Invalid movement type supplied.');
    }
  }

  private async income(entry: IMovementCreateDto, balance: IBalance | null) {
    if (!balance) {
      await this.balanceRepository.store({
        amount: entry.amount,
        user_id: entry.user_id,
      } as IBalance);
    } else {
      balance.amount += entry.amount;
      await this.balanceRepository.update(balance);
    }

    await this.movementRepository.store(entry as IMovement);
  }

  private async outcome(entry: IMovementCreateDto, balance: IBalance | null) {
    if (!balance || balance.amount < entry.amount) {
      throw new ApplicationException('User does not have enough balance.');
    } else {
      balance.amount -= entry.amount;

      await this.balanceRepository.update(balance);
      await this.movementRepository.store(entry as IMovement);
    }
  }
}
