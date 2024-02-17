import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import BookStoreCreateDto from '@/controllers/book/dto/book.create.dto';
import { BookManagerService } from '@/services/book/book.service';

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
}
