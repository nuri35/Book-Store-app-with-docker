export abstract class CustomResponse<T> {
  abstract statusCode: number;

  constructor() {
    Object.setPrototypeOf(this, CustomResponse.prototype);
  }

  abstract serializeResponse(): {
    code: string;
    message: string;
    data: T;
    log: null;
    count?: number;
  };
}
