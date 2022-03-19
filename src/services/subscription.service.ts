import { Types } from 'mongoose';
import { ApplicationException } from '../common/exceptions/application.exception';
import {
  ISubscriptionCreateDto,
  ISubscriptionUpdateDto,
} from '../dtos/subscription.dto';
import { ISubscription } from './repositories/domain/subscription';
import { ISubscriptionRepository } from './repositories/subscription.repository';

export class SubscriptionService {
  constructor(
    private readonly subscriptionRepository: ISubscriptionRepository
  ) {}

  public async find(
    id: number | Types.ObjectId
  ): Promise<ISubscription | null> {
    return await this.subscriptionRepository.find(id);
  }

  public async all(): Promise<ISubscription[]> {
    return await this.subscriptionRepository.all();
  }

  public async store(entry: ISubscriptionCreateDto): Promise<void> {
    const originalEntry = await this.subscriptionRepository.findByUserIdAndCode(
      entry.user_id,
      entry.code
    );

    if (!originalEntry) {
      await this.subscriptionRepository.store(entry as ISubscription);
    } else {
      throw new ApplicationException('User subscription already exists');
    }
  }

  public async update(
    id: number | Types.ObjectId,
    entry: ISubscriptionUpdateDto
  ): Promise<void> {
    const originalEntry = await this.subscriptionRepository.find(id);

    if (!originalEntry) {
      throw new ApplicationException('Subscription not found.');
    }

    originalEntry.code = entry.code;
    originalEntry.amount = entry.amount;
    originalEntry.cron = entry.cron;
    await this.subscriptionRepository.update(originalEntry);
  }

  public async remove(id: number | Types.ObjectId): Promise<void> {
    await this.subscriptionRepository.remove(id);
  }
}
