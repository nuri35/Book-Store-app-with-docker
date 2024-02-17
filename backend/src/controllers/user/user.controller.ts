import { UserService } from '@/services/user/user.service';
import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import UserCreateDto from './dto/user.create.dto';

export class UserController {
  private user = Container.get(UserService);

  public createHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.user.create(req.body as UserCreateDto, req);
      next('router');
    } catch (error: any) {
      next(error);
    }
  };
}
