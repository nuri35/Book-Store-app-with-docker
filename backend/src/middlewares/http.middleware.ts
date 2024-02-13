import { Application } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { json, urlencoded } from 'body-parser';
import compression from 'compression';
import { corsOptions } from '@custom-config/cors.config';
import helmet from 'helmet';
import passport from 'passport';
import hpp from 'hpp';
import timeout from 'connect-timeout';
import passportStrategy from '@passport/strategy.passport';
import cookieParser from 'cookie-parser';

export class HttpMiddleware {
  constructor() {
    passportStrategy(passport);
  }

  static fromMiddleware(): HttpMiddleware {
    return new HttpMiddleware();
  }

  public mount(_express: Application): Application {
    _express.use(morgan('short'));
    _express.set('trust proxy', 1);

    _express.use(cors(corsOptions));

    _express.use(compression());
    _express.use(json());
    _express.use(urlencoded({ extended: false }));
    _express.use(cookieParser());
    _express.use(helmet());
    _express.use((req, res, next) => {
      res.setHeader(
        'Cache-Control',
        'max-age=0, max-stale=0, must-revalidate, no-cache, no-store, post-check=0, pre-check=0, private'
      );

      next();
    });

    _express.use(hpp());
    _express.use(timeout('20s'));

    _express.use(passport.initialize());

    return _express;
  }
}
