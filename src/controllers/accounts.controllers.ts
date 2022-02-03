// external dependencies
import { Request, Response, NextFunction } from 'express';

// local dependencies
import { CreateAccountInput } from '../schemas/accounts.schemas';
import { createAccount } from '../services/accounts.services';
import CustomError from '../utils/customError';

export const createAccountHandler = async (
  req: Request<{}, {}, CreateAccountInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    await createAccount(req.body);
    res.status(201).json({ message: req.t('success.account_create') });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new CustomError(req.t('error.account_unavailable'), 400));
    }
    next(error);
  }
};
