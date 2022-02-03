import { Request, Response, NextFunction } from 'express';

import CustomError from '../utils/customError';

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // create a deep copy of the error instance
  let error = { ...err };

  error.message = err.message;

  res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'Server Error' });
};

export default errorHandler;
