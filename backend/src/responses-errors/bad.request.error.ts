import { CustomError } from '@responses-errors/custom/custom.error';
import { StatusCodes } from 'http-status-codes';
import { ErrorLogField } from 'common-types/interfaces/error.log.field';

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  private data = null;
  constructor(
    private code: string,
    public message: string,
    private log: ErrorLogField[]
  ) {
    super(message);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      log: this.log,
    };
  }
}
