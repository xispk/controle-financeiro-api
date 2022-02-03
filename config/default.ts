export default {
  host: `${
    process.env.NODE_ENV === 'production'
      ? 'https://cifraodeouro-api.herokuapp.com'
      : 'http://localhost'
  }`,
  port: 3001,
  // origin: 'http://localhost:3000',
  origin: `${
    process.env.NODE_ENV === 'production'
      ? 'https://cifraodeouro.vercel.app'
      : 'http://localhost:3000'
  }`,
  cookieDomain: '.vercel.app',
  cookieSecure: true,
  logLevel: 'info',
  // dbUri: 'mongodb://localhost:27017/controle-financeiro',
  access_token_sign_options: { expiresIn: '15m', algorithm: 'RS256' },
  refresh_token_sign_options: { expiresIn: '1y', algorithm: 'RS256' },
  access_token_private_key: '',
  access_token_public_key: '',
  refresh_token_private_key: '',
  refresh_token_public_key: '',
  mongo_uri: '',
};
