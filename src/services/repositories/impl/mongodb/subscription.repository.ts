import { Types } from 'mongoose';
import { ISubscription } from '../../domain/subscription';
import { ISubscriptionRepository } from '../../subscription.repository';
import { SubscriptionModel } from './schemas/subscription.schema';

export class SubscriptionMongoDBRepository implements ISubscriptionRepository {
  public async all(): Promise<ISubscription[]> {
    const result = await SubscriptionModel.find({});

    const convertedResult = result.map((result) => ({
      id: result._id as Types.ObjectId,
      amount: result.amount,
      code: result.code,
      cron: result.cron,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    }));

    return convertedResult as ISubscription[];
  }

  public async find(id: Types.ObjectId): Promise<ISubscription | null> {
    const result = await SubscriptionModel.findById(id);
    if (!result) return null;
    const convertedResult = {
      id: result._id,
      amount: result.amount,
      code: result.code,
      cron: result.cron,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };
    return convertedResult as ISubscription;
  }

  public async findByUserIdAndCode(
    user_id: Types.ObjectId,
    code: string
  ): Promise<ISubscription | null> {
    const result = await SubscriptionModel.findOne({
      user_id: new Types.ObjectId(user_id),
      code: code,
    });
    if (!result) return null;
    const convertedResult = {
      id: result._id,
      amount: result.amount,
      cron: result.cron,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };
    return convertedResult as ISubscription;
  }

  public async store(entry: ISubscription): Promise<void> {
    const newSubscription = new SubscriptionModel(entry);
    await newSubscription.save();
  }

  public async update(entry: ISubscription): Promise<void> {
    await SubscriptionModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(entry.id),
      },
      entry
    );
  }

  public async remove(id: number): Promise<void> {
    await SubscriptionModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
  }
}
