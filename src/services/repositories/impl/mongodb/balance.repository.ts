import { Types } from 'mongoose';
import { IBalanceRepository } from '../../balance.repository';
import { IBalance } from '../../domain/balance';
import BalanceModel from './schemas/balance.schema';

export class BalanceMongoDBlRepository implements IBalanceRepository {
  public async find(id: string): Promise<IBalance | null> {
    const balanceId = new Types.ObjectId(id);
    const result = await BalanceModel.findById(balanceId);
    if (!result) return null;

    const sendResult = {
      id: result._id,
      user_id: result.user_id,
      amount: result.amount,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };

    return sendResult as IBalance;
  }

  public async findByUserId(userId: string): Promise<IBalance | null> {
    const userObjectId = new Types.ObjectId(userId);

    const result = await BalanceModel.findOne({
      user_id: userObjectId,
    });
    if (!result) return null;
    const sendResult = {
      id: result._id,
      user_id: result.user_id,
      amount: result.amount,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };
    return sendResult as IBalance;
  }

  public async all(): Promise<IBalance[]> {
    const result = await BalanceModel.find({});

    const sendResult = result.map((result) => ({
      id: result._id as Types.ObjectId,
      user_id: result.user_id,
      amount: result.amount,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    }));

    return sendResult as IBalance[];
  }

  public async store(entry: IBalance): Promise<void> {
    const Balance = new BalanceModel(entry);
    await Balance.save();
  }

  public async update(entry: IBalance): Promise<void> {
    await BalanceModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(entry.id),
      },
      entry
    );
  }

  public async remove(id: string): Promise<void> {
    await BalanceModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
  }
}
