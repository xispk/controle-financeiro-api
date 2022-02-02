export default {
  host: 'http://localhost',
  port: 3001,
  // origin: 'http://localhost:3000',
  origin: 'https://cifraodeouro.vercel.app/',
  cookieDomain: 'https://cifraodeouro.vercel.app/',
  cookieSecure: true,
  logLevel: 'info',
  // dbUri: 'mongodb://localhost:27017/controle-financeiro',
  access_token_sign_options: { expiresIn: '15m', algorithm: 'RS256' },
  refresh_token_sign_options: { expiresIn: '1y', algorithm: 'RS256' },
};
