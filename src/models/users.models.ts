import mongoose from 'mongoose';
import argon2 from 'argon2';

export interface User {
  name: string;
  password: string;
  username: string;
  account: mongoose.Types.ObjectId;
  role: 'master' | 'dependant';
  active: boolean;
  comparePasswords: (candidatePassword: string) => Promise<boolean>;
}

export const userPrivateFields = ['password', '__v'];

// create mongoose schema for users based on the interface
const UserSchema = new mongoose.Schema<User>(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    account: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Account',
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: {
        values: ['master', 'dependant'],
        message: '{VALUE} is not supported',
      },
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// method to hash the password using argon2 every time the password changes
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await argon2.hash(this.password);
  next();
});

// method to compare the hash stored with the candidate password provided
UserSchema.methods.comparePasswords = async function (
  candidatePassword: string
): Promise<boolean> {
  return await argon2.verify(this.password, candidatePassword);
};

const UserModel = mongoose.model<User>('User', UserSchema);

export default UserModel;
