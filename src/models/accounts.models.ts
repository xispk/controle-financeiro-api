import mongoose, { Schema } from 'mongoose';

export interface Account {
  email: string;
  active: boolean;
  tier: 'basic' | 'pro';
  users: mongoose.Types.ObjectId[];
}

const AccountSchema = new mongoose.Schema<Account>(
  {
    email: { type: String, required: true, unique: true },
    active: { type: Boolean, default: true },
    tier: {
      type: String,
      required: true,
      enum: { values: ['basic', 'pro'], message: '{VALUE} is not supported' },
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  },
  {
    timestamps: true,
  }
);

const AccountModel = mongoose.model<Account>('Account', AccountSchema);

export default AccountModel;
