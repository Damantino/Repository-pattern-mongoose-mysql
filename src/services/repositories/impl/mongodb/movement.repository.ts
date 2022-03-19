import { Types } from 'mongoose';
import { IMovementRepository } from '../../movement.repository';
import { IMovement } from '../../domain/movement';
import { MovementModel } from './schemas/movement.schema';

export class MovementMongoDBLRepository implements IMovementRepository {
  public async find(id: Types.ObjectId): Promise<IMovement | null> {
    const result = await MovementModel.findById(id);
    if (!result) return null;
    const convertedResult = {
      id: result._id,
      user_id: result.user_id,
      amount: result.amount,
      type: result.type,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    };
    return convertedResult as IMovement;
  }

  public async all(): Promise<IMovement[]> {
    const result = await MovementModel.find({});

    const convertedResult = result.map((result) => ({
      id: result._id as Types.ObjectId,
      user_id: result.user_id,
      amount: result.amount,
      type: result.type,
      created_at: result.createdAt,
      updated_at: result.updatedAt,
    }));

    return convertedResult as IMovement[];
  }

  public async store(entry: IMovement): Promise<void> {
    const newMovement = new MovementModel(entry);
    await newMovement.save();
  }

  public async update(entry: IMovement): Promise<void> {
    await MovementModel.findOneAndUpdate(
      {
        _id: new Types.ObjectId(entry.id),
      },
      entry
    );
  }

  public async remove(id: Types.ObjectId): Promise<void> {
    await MovementModel.deleteOne({
      _id: new Types.ObjectId(id),
    });
  }
}
