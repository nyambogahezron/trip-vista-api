import CustomError from './customError.js';
import { StatusCodes } from 'http-status-codes';

class Notfound extends CustomError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
