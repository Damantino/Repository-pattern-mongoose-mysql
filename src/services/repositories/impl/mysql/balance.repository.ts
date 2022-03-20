import { ResultSetHeader, RowDataPacket } from 'mysql2';
import connector from '../../../../common/persistence/mysql.persistent';
import { IBalanceRepository } from "../../balance.repository";
import { IBalance } from "../../domain/balance";

export class BalanceMysqlRepository implements IBalanceRepository {
    public async find(id: string): Promise<IBalance | null> {

        const [rows] = await connector.execute<RowDataPacket[]>(
            'SELECT * FROM wallet_balance WHERE id = ?',
            [parseInt(id)]
        );

        if (rows.length) {
            return rows[0] as IBalance;
        }

        return null;
    }

    public async findByUserId(userId: string): Promise<IBalance | null> {
        const [rows] = await connector.execute<RowDataPacket[]>(
            'SELECT * FROM wallet_balance WHERE user_id = ?',
            [parseInt(userId)]
        );

        if (rows.length) {
            return rows[0] as IBalance;
        }

        return null;
    }

    public async all(): Promise<IBalance[]> {
        const [rows] = await connector.execute<RowDataPacket[]>(
            'SELECT * FROM wallet_balance ORDER BY id DESC'
        );

        return rows as IBalance[];
    }

    public async store(entry: IBalance): Promise<void> {
        const now = new Date();

        await connector.execute<ResultSetHeader>(
            'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)',
            [parseInt(entry.user_id as string), entry.amount, now]
        );
    }

    public async update(entry: IBalance): Promise<void> {
        const now = new Date();

        await connector.execute<ResultSetHeader>(
            'UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?',
            [parseInt(entry.user_id as string), entry.amount, now, parseInt(entry.id as string)]
        );
    }

    public async remove(id: string): Promise<void> {
        await connector.execute<ResultSetHeader>(
            'DELETE FROM wallet_balance WHERE id = ?',
            [parseInt(id)]
        );
    }
}