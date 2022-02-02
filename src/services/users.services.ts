import { CreateUserInput } from '../schemas/users.schemas';
import UserModel from '../models/users.models';

// create a new user
export const createUser = ({ user }: { user: Partial<CreateUserInput> }) => {
  return UserModel.create(user);
};

// methods to find users
export const findUserByEmail = ({ email }: { email: string }) => {
  return UserModel.findOne({ email });
};

export const findUserById = (id: string) => {
  return UserModel.findById(id);
};

export const findUserByUsername = (username: string) => {
  return UserModel.findOne({ username });
};

// methods to edit users
