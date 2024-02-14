import { CustomResponse } from '@responses/custom/custom.response';
import { StatusCodes } from 'http-status-codes';

export class OkResponse<T> extends CustomResponse<T> {
  statusCode = StatusCodes.OK;
  private log = null;
  constructor(
    private code: string,
    private message: string,
    private data: T,
    private count?: number
  ) {
    super();
    Object.setPrototypeOf(this, OkResponse.prototype);
  }

  serializeResponse() {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
      log: this.log,
      count: this.count,
    };
  }
}
