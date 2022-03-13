import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connector from '../../../../common/persistence/mysql.persistent';
import { ISubscription } from '../../domain/subscription';
import { ISubscriptionRepository } from '../../subscription.repository';

export class SubscriptionMysqlRepository implements ISubscriptionRepository{
  public async all(): Promise<ISubscription[]> {
    const [rows] = await connector.execute<RowDataPacket[]>(
      'SELECT * FROM wallet_subscription ORDER BY id DESC'
    );

    return rows as ISubscription[];
  }

  public async find(id: number): Promise<ISubscription | null> {
    const [rows] = await connector.execute<RowDataPacket[]>(
      'SELECT * FROM wallet_subscription WHERE id = ?',
      [id]
    );

    if (rows.length) {
      return rows[0] as ISubscription;
    }

    return null;
  }

  public async findByUserIdAndCode(
    user_id: number,
    code: string
  ): Promise<ISubscription | null> {
    const [rows] = await connector.execute<RowDataPacket[]>(
      'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?',
      [user_id, code]
    );

    if (rows.length) {
      return rows[0] as ISubscription;
    }

    return null;
  }

  public async store(entry: ISubscription): Promise<void> {
    const now = new Date();

    await connector.execute<ResultSetHeader>(
      'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)',
      [entry.user_id, entry.code, entry.amount, entry.cron, now]
    );
  }

  public async update(entry: ISubscription): Promise<void> {
    const now = new Date();

    await connector.execute<ResultSetHeader>(
      'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
      [entry.user_id, entry.code, entry.amount, entry.cron, now, entry.id]
    );
  }

  public async remove(id: number): Promise<void> {
    await connector.execute<ResultSetHeader>('DELETE FROM wallet_subscription WHERE id = ?', [
      id,
    ]);
  }
}
