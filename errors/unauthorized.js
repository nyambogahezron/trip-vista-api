import CustomError from './customError.js';
import { StatusCodes } from 'http-status-codes';

class UnauthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}
export default UnauthorizedError;
