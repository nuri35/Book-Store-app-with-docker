import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import BookStoreCreateDto from '@/controllers/book/dto/store.create.dto';
import { BookManagerService } from '@/services/book/book.service';
import BookCreateDto from '@/controllers/book/dto/book.create.dto';

export class BookManagerController {
  private bookManager = Container.get(BookManagerService);

  public createBookStoreHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.bookManager.createBookStore(
        req.body as BookStoreCreateDto,
        req
      );
      next('router');
    } catch (error: any) {
      next(error);
    }
  };

  public createBookHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.bookManager.createBook(
        req.body as BookCreateDto,
        req
      );
      next('router');
    } catch (error: any) {
      next(error);
    }
  };
}
