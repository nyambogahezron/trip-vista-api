import { StatusCodes } from 'http-status-codes';
import { CustomAPIError} from '../errors/index.js';

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).send('Route does not exist');
  next(error);
};

const errorHandler = (err, req, res, next) => {
  console.log(err.stack);

  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || 'something went wrong, please try again!',
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  if (err.name === 'ValidationError') {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} field, please choose another value`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  // Mongoose not found error
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    customError.msg = `No item found with id : ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return res.status(customError.statusCode).json({
    msg: customError.msg,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
