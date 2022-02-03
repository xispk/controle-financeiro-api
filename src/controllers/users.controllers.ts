// external dependencies
import { NextFunction, Request, Response } from 'express';

// local dependencies
import { CreateUserInput } from '../schemas/users.schemas';
import {
  findAccountByEmail,
  findAccountByIdAndUpdate,
} from '../services/accounts.services';
import { createUser } from '../services/users.services';
import CustomError from '../utils/customError';

// create new users
export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput>,
  res: Response,
  next: NextFunction
) => {
  const { account: email } = req.body;
  let user = req.body;

  try {
    // Verify if the account provided is valid
    const account = await findAccountByEmail({ email });

    // if the account does not exist
    if (!account) {
      return next(new CustomError(req.t('error.account_404'), 400));
    }

    // if the account is inactive
    if (!account.active) {
      return next(new CustomError(req.t('error.account_inactive'), 400));
    }

    // if the account is basic and already have a member
    if (account.tier === 'basic' && account.users.length >= 2) {
      return next(new CustomError(req.t('error.account_max_basic'), 400));
    }

    // if the account doesnt have members set the first user to master
    if (account.users.length === 0) {
      user.role = 'master';
    } else {
      // set the user to dependant since can only be one master per acc
      user.role = 'dependant';
    }

    // update the user account with the account id
    user.account = String(account._id);
    const newUser = await createUser({ user });

    // updated the users array inside the account to include the new user
    await findAccountByIdAndUpdate({
      accountId: String(account._id),
      userId: String(newUser._id),
    });

    res.status(201).json({ message: req.t('success.user_create') });
  } catch (error: any) {
    if (error.code === 11000) {
      return next(new CustomError(req.t('error.user_unavailable'), 400));
    }
    next(error);
  }
};

// send the user based on the access token from the deserialization
export const getCurrentUserHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = res.locals.user;
  if (!user) return next(new CustomError(req.t('error.user_logged_out'), 400));
  res.status(200).json({ success: user });
};
