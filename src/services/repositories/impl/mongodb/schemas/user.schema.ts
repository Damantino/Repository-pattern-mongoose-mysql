import { Schema, Document } from 'mongoose';
import mongolDbConnection from '../../../../../common/persistence/mongodb.persistent';

interface User extends Document{
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<User>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserModel = mongolDbConnection.model<User>('User', userSchema);
