import { Router } from 'express';
import { ValidationMiddleware } from '@/middlewares/validation.middleware';
import { Routes } from '@common-types/interfaces/routes.interface';
import { RouterLabel, RouterPath } from '@common-types/enums/router.enum';
import { Is } from '@middlewares/auth.middleware';
import { UserType } from '@/common-types/enums/type.enum';
import BookStoreCreateDto from '@/controllers/book/dto/book.create.dto';
import { BookManagerController } from '@/controllers/book/book.controller';

export class BookManagerRoute implements Routes {
  private static instance: BookManagerRoute;
  private path = '/';
  public label = RouterLabel.BookManager;
  public router: Router;
  private bookManager: BookManagerController;

  constructor() {
    this.router = Router();

    this.bookManager = new BookManagerController();
    this.initializeRoutes();
  }

  public static triggerUser(): BookManagerRoute {
    if (!BookManagerRoute.instance) {
      BookManagerRoute.instance = new BookManagerRoute();
    }
    return BookManagerRoute.instance;
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}${RouterPath.BookStoreEndpoint}`,
      Is.loggedIn,
      Is.hasPermission(UserType.Admin),
      ValidationMiddleware(BookStoreCreateDto),
      this.bookManager.createBookStoreHandler
    );
  }
}