import mongoose, { Document, Model, Schema } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  roles: string[];
  createdAt: Date;
}

const userSchema: Schema<User> = new mongoose.Schema<User>(
  {
    email: String,
    password: String,
    roles: {
      type: [String],
      enum: ['CREATOR', 'VIEWER', 'VIEW_ALL'],
      default: ['VIEWER']
    }
  },
  { timestamps: { createdAt: true } }
);

const UserModel: Model<User> = mongoose.model<User>('user', userSchema);

export { UserModel };