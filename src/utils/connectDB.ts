import mongoose from 'mongoose';
import config from 'config';
import log from './logger';

const connectDB = async (): Promise<void> => {
  const dbUri = config.get<string>('mongo_uri');
  try {
    await mongoose.connect(dbUri);
    log.info('Connected to the database');
  } catch (error: any) {
    log.error(error.message);
  }
};

export default connectDB;
