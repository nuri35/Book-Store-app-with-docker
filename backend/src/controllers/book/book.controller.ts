import { Request, Response, NextFunction } from 'express';
import Container from 'typedi';
import BookStoreCreateDto from '@/controllers/book/dto/store.create.dto';
import { BookManagerService } from '@/services/book/book.service';
import BookCreateDto from '@/controllers/book/dto/book.create.dto';
import AddStockDto from '@/controllers/book/dto/add.stock.dto';
import BookStoreQueryDto from '@/controllers/book/dto/book.store.query.dto';

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

  public addStockHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      res.locals.data = await this.bookManager.addStock(
        req.body as AddStockDto,
        req
      );
      next('router');
    } catch (error: any) {
      next(error);
    }
  };

  public lookupBookStoreHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const queryDto = req.query as unknown as BookStoreQueryDto;
      res.locals.data = await this.bookManager.lookupBookStore(req, queryDto);
      next('router');
    } catch (error: any) {
      next(error);
    }
  };

  public lookupStoreToBookHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const queryDto = req.query as unknown as BookStoreQueryDto;
      res.locals.data = await this.bookManager.lookupStoreToBook(req, queryDto);
      next('router');
    } catch (error: any) {
      next(error);
    }
  };
}
