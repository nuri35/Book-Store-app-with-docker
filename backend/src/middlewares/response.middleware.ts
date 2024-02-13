import express, { NextFunction, Response, Request } from 'express';
import { CustomResponse } from '@responses/custom/custom.response';
import { CustomError } from '@responses-errors/custom/custom.error';
import { logger } from '@/logger/custom.logger';

export async function responseMiddleware(
  router: express.Router,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> {
  if (res.locals.data) {
    if (res.locals.data instanceof CustomResponse) {
      const dynamicObject = res.locals.data.serializeResponse();
      logger.client.info(
        ` ${dynamicObject.message}: Worker pid=${process.pid}:: ... `
      );

      return res.status(res.locals.data.statusCode).json(dynamicObject);
    } else if (res.locals.data instanceof CustomError) {
      const dynamicObject = res.locals.data.serializeErrors();
      logger.client.info(
        ` ${dynamicObject.message}: Worker pid=${process.pid}:: ... `
      );

      return res.status(res.locals.data.statusCode).json(dynamicObject);
    }
  }
  next(router);
}
