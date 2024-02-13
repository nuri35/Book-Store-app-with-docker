import { CustomResponse } from '@responses/custom/custom.response';
import { StatusCodes } from 'http-status-codes';
export class CreatedResponse<T> extends CustomResponse<T> {
  statusCode = StatusCodes.CREATED;
  private log = null;
  constructor(private code: string, private message: string, private data: T) {
    super();
    Object.setPrototypeOf(this, CreatedResponse.prototype);
  }

  serializeResponse() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      log: this.log,
    };
  }
}
