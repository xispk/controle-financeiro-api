import { Request, Response, NextFunction } from 'express';
import { jwtVerify } from '../utils/jwt';

// takes the access token decode and set the content to res.locals as user
const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
  // get the access token from the cookies or authorization header
  const accessToken =
    req.cookies.accessToken ||
    (req.headers.authorization || '').replace(/^Bearer\s/, '');

  // check if there is any access token
  if (!accessToken) {
    return next();
  }

  const decoded = jwtVerify(accessToken, 'access_token_public_key');

  // check if the token is valid
  if (decoded) {
    res.locals.user = decoded;
  }
  return next();
};

export default deserializeUser;
