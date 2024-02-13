import { NextFunction, Response, Request } from 'express';
import { CustomError } from '@responses-errors/custom/custom.error';
import { StatusCodes } from 'http-status-codes';
import { ErrorCode } from '@bestnetlib/common';
import { logger } from '@/logger/custom.logger';

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): any {
  if (err instanceof CustomError) {
    const dynamicErrorObject = err.serializeErrors();
    logger.client.error(
      `${dynamicErrorObject.message}: Worker pid=${process.pid}:: ... `
    );
    return res.status(err.statusCode).json(dynamicErrorObject);
  } else if (err instanceof Error) {
    logger.client.error(`${err.message}: Worker pid=${process.pid}:: ... `);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
      code: ErrorCode.TECHNICAL_ERROR,
      message: err.message,
      data: null,
      log: [
        {
          logCode: ErrorCode.TECHNICAL_ERROR,
          logMessage: err.message,
          logData: err.name,
        },
      ],
    });
  }
}
