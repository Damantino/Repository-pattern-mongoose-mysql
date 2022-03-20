import connector from '../../../../common/persistence/mysql.persistent';
import { IMovementRepository } from '../../movement.repository';
import { IMovement } from '../../domain/movement';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export class MovementMySQLRepository implements IMovementRepository {
  public async find(id: string): Promise<IMovement | null> {
    const [rows] = await connector.execute<RowDataPacket[]>(
      'SELECT * FROM wallet_movement WHERE id = ?',
      [parseInt(id)]
    );

    if (rows.length) {
      return rows[0] as IMovement;
    }

    return null;
  }

  public async all(): Promise<IMovement[]> {
    const [rows] = await connector.execute<RowDataPacket[]>(
      'SELECT * FROM wallet_movement ORDER BY id DESC'
    );

    return rows as IMovement[];
  }

  public async store(entry: IMovement): Promise<void> {
    const now = new Date();

    await connector.execute<ResultSetHeader>(
      'INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)',
      [parseInt(entry.user_id as string), entry.type, entry.amount, now]
    );
  }

  public async update(entry: IMovement): Promise<void> {
    const now = new Date();

    await connector.execute<ResultSetHeader>(
      'UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?',
      [
        parseInt(entry.user_id as string),
        entry.type,
        entry.amount,
        now,
        parseInt(entry.id as string),
      ]
    );
  }

  public async remove(id: string): Promise<void> {
    await connector.execute<ResultSetHeader>(
      'DELETE FROM wallet_movement WHERE id = ?',
      [parseInt(id)]
    );
  }
}
