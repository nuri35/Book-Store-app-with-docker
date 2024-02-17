import { Router } from 'express';
import { UserController } from '@/controllers/user/user.controller';
import UserCreateDto from '@/controllers/user/dto/user.create.dto';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@common-types/interfaces/routes.interface';
import { RouterLabel } from '@common-types/enums/router.enum';
import { Is } from '@middlewares/auth.middleware';
import { UserType } from '@/common-types/enums/type.enum';

export class UserRoute implements Routes {
  private static instance: UserRoute;
  private path = '/';
  public label = RouterLabel.User;
  public router: Router;
  private user: UserController;

  constructor() {
    this.router = Router();

    this.user = new UserController();
    this.initializeRoutes();
  }

  public static triggerUser(): UserRoute {
    if (!UserRoute.instance) {
      UserRoute.instance = new UserRoute();
    }
    return UserRoute.instance;
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}`,
      Is.loggedIn,
      Is.hasPermission(UserType.Admin),
      ValidationMiddleware(UserCreateDto),
      this.user.createHandler
    );
  }
}
