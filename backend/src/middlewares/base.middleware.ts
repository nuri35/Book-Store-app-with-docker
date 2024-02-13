import { Application } from 'express';
import { HttpMiddleware } from '@/middlewares/http.middleware';

class BaseMiddleware {
  public static init(_express: Application): Application {
    // Mount basic express apis middleware

    _express = HttpMiddleware.fromMiddleware().mount(_express);

    return _express;
  }
}

export default BaseMiddleware;
