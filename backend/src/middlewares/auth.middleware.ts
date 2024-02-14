import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import { ErrorCode, ErrorMessages } from '@bestnetlib/common';
import { InvalidTokenError } from '@/responses-errors/invalid.token.error';
import { ForbiddenError } from '@/responses-errors/forbidden.error';
import { UserPayload } from '@/common-types/interfaces/payload.interface';
import { SessionEntity } from '@/entities/session.entity';

import { UserType } from '@/common-types/enums/type.enum';

class AuthenticationMiddleware {
  static loggedIn(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      'jwt',
      { session: false },
      (
        err: any,
        session: SessionEntity | false | null,
        info: object | string | Array<string | undefined>
      ) => {
        if (err) {
          return next(err); // maybe 500
        }
        if (!session) {
          return next(
            new InvalidTokenError(
              ErrorCode.INVALID_TOKEN,
              ErrorMessages.INVALID_TOKEN,
              [
                {
                  logCode: ErrorCode.INVALID_TOKEN,
                  logMessage: ErrorMessages.INVALID_TOKEN,
                  logData: `User: nono`,
                },
              ]
            )
          );
        }

        req.currentSession = session;

        next();
      }
    )(req, res, next);
  }

  static rfTokenVerify(req: Request, res: Response, next: NextFunction) {
    passport.authenticate(
      'jwt-refresh',
      { session: false },
      (
        err: any,
        payload: UserPayload | false | null,
        info: object | string | Array<string | undefined>
      ) => {
        if (err) {
          return next(err);
        }
        if (!payload) {
          res.clearCookie('jwt');
          throw new ForbiddenError(
            ErrorCode.INVALID_TOKEN,
            ErrorMessages.INVALID_TOKEN,
            [
              {
                logCode: ErrorCode.INVALID_TOKEN,
                logMessage: ErrorMessages.INVALID_TOKEN,
                logData: 'true',
              },
            ]
          );
        }

        req.rfTokenPayload = payload;
        next();
      }
    )(req, res, next);
  }

  static hasPermission(...allowedTypes: UserType[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { user } = req.currentSession as SessionEntity;
      const { type } = user;

      if (!allowedTypes.includes(type)) {
        throw new ForbiddenError(
          ErrorCode.ACCESS_DENIED,
          ErrorMessages.ACCESS_DENIED,
          [
            {
              logCode: ErrorCode.ACCESS_DENIED,
              logMessage: ErrorMessages.ACCESS_DENIED,
              logData: `User: ${user.publicId}`,
            },
          ]
        );
      }

      next();
    };
  }
}

export { AuthenticationMiddleware as Is };
