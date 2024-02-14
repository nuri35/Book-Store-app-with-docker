import { Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { AuthService } from '@services/auth/auth.service';
import AuthRegisterDto from '@controllers/auth/dto/auth.register.dto';
import VerifyEmailDto from '@controllers/auth/dto/auth.verify.email.dto';
import AuthLoginDto from '@controllers/auth/dto/auth.login.dto';

export class AuthController {
  private auth = Container.get(AuthService);

  public registerHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.auth.register(req.body as AuthRegisterDto);
      next('router');
    } catch (error: any) {
      next(error);
    }
  };

  public verifyEmailHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.auth.verifyEmail(req.body as VerifyEmailDto);
      next('router');
    } catch (error: any) {
      next(error);
    }
  };

  public loginHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.auth.login(req.body as AuthLoginDto, res);
      next('router');
    } catch (error: any) {
      next(error);
    }
  };

  public logOutHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.auth.logOut(req.currentSession!, res);

      next('router');
    } catch (error: any) {
      next(error);
    }
  };

  public reNewTokenHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      //
      res.locals.data = await this.auth.reNewToken(req.rfTokenPayload!, res);

      next('router');
    } catch (error: any) {
      next(error);
    }
  };
}
