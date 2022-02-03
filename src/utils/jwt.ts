import jwt from 'jsonwebtoken';
import log from './logger';
import config from 'config';

export const jwtSign = (
  payload: Object,
  keyName: 'access_token_private_key' | 'refresh_token_private_key',
  optionsName: 'access_token_sign_options' | 'refresh_token_sign_options'
) => {
  const privateKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');

  const signOptions = config.get<jwt.SignOptions>(optionsName);

  try {
    return jwt.sign(payload, privateKey, signOptions);
  } catch (error) {
    log.error(error);
  }
};

export const jwtVerify = (
  token: string,
  keyName: 'access_token_public_key' | 'refresh_token_public_key'
) => {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString(
    'ascii'
  );

  try {
    return jwt.verify(token, publicKey);
  } catch (error: any) {
    log.error(error.message);
  }
};
