import SessionModel from '../models/auth.models';

export const createSession = (user: string) => {
  return SessionModel.create({ user });
};
