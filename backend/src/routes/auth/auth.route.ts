import { Router } from 'express';
import { AuthController } from '@controllers/auth/auth.controller';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import AuthRegisterDto from '@controllers/auth/dto/auth.register.dto';
import AuthLoginDto from '@controllers/auth/dto/auth.login.dto';
import VerifyEmailDto from '@controllers/auth/dto/auth.verify.email.dto';
import { Routes } from '@common-types/interfaces/routes.interface';
import { RouterLabel, RouterPath } from '@common-types/enums/router.enum';
import { Is } from '@middlewares/auth.middleware';

export class AuthRoute implements Routes {
  private static instance: AuthRoute;
  private path = '/';
  public label = RouterLabel.Auth;
  public router: Router;
  private auth: AuthController;

  constructor() {
    this.router = Router();

    this.auth = new AuthController();
    this.initializeRoutes();
  }

  public static triggerUser(): AuthRoute {
    if (!AuthRoute.instance) {
      AuthRoute.instance = new AuthRoute();
    }
    return AuthRoute.instance;
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}${RouterPath.RegisterEndpoint}`,
      ValidationMiddleware(AuthRegisterDto),
      this.auth.registerHandler
    );

    this.router.post(
      `${this.path}${RouterPath.VerifyEndpoint}`,
      ValidationMiddleware(VerifyEmailDto),
      this.auth.verifyEmailHandler
    );

    this.router.post(
      `${this.path}${RouterPath.LoginEndpoint}`,
      ValidationMiddleware(AuthLoginDto),
      this.auth.loginHandler
    );

    this.router.post(
      `${this.path}${RouterPath.LogoutEndpoint}`,
      Is.loggedIn,
      this.auth.logOutHandler
    );

    this.router.get(
      `${this.path}${RouterPath.ReNewTokenEndpoint}`,
      Is.rfTokenVerify,
      this.auth.reNewTokenHandler
    );
  }
}
