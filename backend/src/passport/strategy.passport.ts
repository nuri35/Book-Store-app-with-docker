import passportJWT from 'passport-jwt';
import { Request } from 'express';
import { cookieExtractor } from './extractor/extract.jwt';
import { UserPayload } from '@/common-types/interfaces/payload.interface';
import { SessionRepository } from '@/repositories/session/session.repository';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const passportStrategy = (passport: {
  use: (jwtName: string, arg0: passportJWT.Strategy) => void;
}) => {
  passport.use(
    'jwt',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_ACCESS_KEY!,
        passReqToCallback: true,
      },
      async (
        req: Request,
        payload: UserPayload,
        done: passportJWT.VerifiedCallback
      ) => {
        try {
          const session = await SessionRepository.findValidTokenBySession(
            {
              id: true,
              user: {
                id: true,
                publicId: true,
                type: true,
                name: true,
                app: {
                  type: true,
                },
                surname: true,
                I: {
                  mail: true,
                  phone: true,
                  title: true,
                },
              },
              token: {
                id: true,
              },
            },
            payload
          );

          if (!session) {
            return done(null, false);
          }

          return done(null, session);
        } catch (findUserError) {
          return done(findUserError, false);
        }
      }
    )
  );

  passport.use(
    'jwt-refresh',
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_REFRESH_KEY!,
      },
      async (payload: UserPayload, done: passportJWT.VerifiedCallback) => {
        done(null, payload);
      }
    )
  );
};

export default passportStrategy;
