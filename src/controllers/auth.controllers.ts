// external dependencies
import { NextFunction, Request, Response } from 'express';
import { omit, reduce } from 'lodash';
import config from 'config';

// local dependencies
import { CreateSessionInput } from '../schemas/auth.schemas';
import { jwtSign } from '../utils/jwt';
import { userPrivateFields } from '../models/users.models';
import { sessionPrivateFields } from '../models/auth.models';
import { findAccountByEmail } from '../services/accounts.services';
import { findUserByUsername } from '../services/users.services';
import { createSession } from '../services/auth.services';
import CustomError from '../utils/customError';

// handler that executes the flow for user login
export const createSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput>,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;
  try {
    // check if there is an account with the email informed
    const account = await findAccountByEmail({ email });

    if (!account) {
      return next(new CustomError(req.t('error.account_unauthorized'), 401));
    }

    // check if there is a memmber with the id informed
    const user = await findUserByUsername(username).select('+password');

    if (!user) {
      return next(new CustomError(req.t('error.user_404'), 404));
    }

    // check if the account contains the member found
    if (!account.users.includes(user._id)) {
      return next(new CustomError(req.t('error.account_user_404'), 404));
    }

    const isValid = await user.comparePasswords(password);

    // check if the passwords match
    if (!isValid) {
      return next(new CustomError(req.t('error.account_unauthorized'), 401));
    }

    // create session
    const session = await createSession(String(user._id));
    // create refreshToken
    // jwtSign payload should be a plain object. using omit to exclude private
    // fields and toJSON() to convert to plain object
    const refreshToken = jwtSign(
      omit(session.toJSON(), sessionPrivateFields),
      'refresh_token_private_key',
      'refresh_token_sign_options'
    );

    const cookieDomain = config.get<string>('cookieDomain');
    const cookieSecure = config.get<boolean>('cookieSecure');

    // set cookie for refresh token
    res.cookie('refreshToken', refreshToken, {
      maxAge: 3.154e10,
      httpOnly: true,
      domain: cookieDomain,
      path: '/',
      sameSite: false,
      secure: cookieSecure,
    });

    // create accessToken
    // jwtSign payload should be a plain object. using omit to exclude private
    // fields and toJSON() to convert to plain object
    const accessToken = jwtSign(
      omit(user.toJSON(), userPrivateFields),
      'access_token_private_key',
      'access_token_sign_options'
    );

    // set cookie for access token
    res.cookie('accessToken', accessToken, {
      maxAge: 900000,
      httpOnly: true,
      domain: cookieDomain,
      path: '/',
      sameSite: false,
      secure: cookieSecure,
    });

    res
      .status(200)
      .json({ status: 'success', message: req.t('success.session_create') });
  } catch (error) {
    next(error);
  }
};
