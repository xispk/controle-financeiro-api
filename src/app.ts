require('dotenv').config();
import express from 'express';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import i18next from 'i18next';
import Backend from 'i18next-fs-backend';
import middleware from 'i18next-http-middleware';

import log from './utils/logger';
import router from './routes';
import connectDB from './utils/connectDB';
import deserializeUser from './middlewares/deserializeUser';
import errorHandler from './middlewares/errorHandler';

// i18next for internationalization,
// Backend for fs translation
// middleware for language detector
i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    backend: {
      loadPath: './locales/{{lng}}/translation.json',
    },
  });

const app = express();

app.use(middleware.handle(i18next));
app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(deserializeUser);
app.use(router);
app.use(errorHandler);

const host = config.get<string>('host');
const port = config.get<number>('port');

app.listen(port, () => {
  connectDB();
  log.info(`Server running on: ${host}/${port}`);
});
