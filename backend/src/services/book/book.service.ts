import { Request } from 'express';
import { Service } from 'typedi';
import DataSourceFactory from '@source/data.source';
import { EntityManager } from 'typeorm';
import BookStoreCreateDto from '@/controllers/book/dto/store.create.dto';
import { BookRepository } from '@/repositories/book/book.repository';
import { StoreRepository } from '@/repositories/store/store.repository';
import { CreatedResponse } from '@/responses/created.response';
import BookCreateDto from '@/controllers/book/dto/book.create.dto';
import { StoreEntity } from '@/entities/store.entity';
import { Code, ErrorCode, ErrorMessages, Messages } from '@bestnetlib/common';
import { BookEntity } from '@/entities/book.entity';
import StoreResDto from '@/controllers/book/response-dto/store.create.dto';
import BookCreateResDto from '@/controllers/book/response-dto/book.create.dto';
import TransformService from '../help-service/conversion/data.transform';
import AddStockDto from '@/controllers/book/dto/add.stock.dto';
import { NotFoundError } from '@/responses-errors/not.found.error';
import { OkResponse } from '@/responses/ok.response';
import { BookToStoreEntity } from '@/entities/book.to.store.entity';
import { BookToStoreRepository } from '@/repositories/book/book.to.store.repository';

@Service()
export class BookManagerService {
  private readonly dbSource = DataSourceFactory.source;

  public async createBookStore(
    dto: BookStoreCreateDto,
    req: Request
  ): Promise<CreatedResponse<StoreResDto>> {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const storeMethod = await transactionalEntityManager.withRepository(
            StoreRepository
          );
          const resultStore = await storeMethod.customCreate(
            dto,
            req.currentSession!.user.id
          );
          const convertData = TransformService.convert<
            StoreResDto,
            StoreEntity
          >(resultStore, StoreResDto, 'excludeAll');
          return new CreatedResponse<StoreResDto>(
            Code.SUCCESS_CREATE,
            Messages.SUCCESS_CREATE,
            convertData
          );
        } catch (error) {
          throw error;
        }
      }
    );
  }

  public createBook = async (dto: BookCreateDto, req: Request) => {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const bookMethod = await transactionalEntityManager.withRepository(
            BookRepository
          );
          const resultBook = await bookMethod.customCreate(
            dto,
            req.currentSession!.user.id
          );
          const convertData = TransformService.convert<
            BookCreateResDto,
            BookEntity
          >(resultBook, BookCreateResDto, 'excludeAll');
          return new CreatedResponse<BookCreateResDto>(
            Code.SUCCESS_CREATE,
            Messages.SUCCESS_CREATE,
            convertData
          );
        } catch (error) {
          throw error;
        }
      }
    );
  };

  public addStock = async (dto: AddStockDto, req: Request) => {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const storeMethod = await transactionalEntityManager.withRepository(
            StoreRepository
          );
          const bookMethod = await transactionalEntityManager.withRepository(
            BookRepository
          );
          const bookToStoreMethod =
            await transactionalEntityManager.withRepository(
              BookToStoreRepository
            );
          const resultStore = await storeMethod.customFindOne(dto.storeId);
          const resultBook = await bookMethod.customFindOne(dto.bookId);
          if (!resultStore || !resultBook) {
            throw new NotFoundError(
              ErrorCode.RECORD_NOT_FOUND,
              ErrorMessages.RECORD_NOT_FOUND,
              [
                {
                  logCode: ErrorCode.RECORD_NOT_FOUND,
                  logMessage: ErrorMessages.RECORD_NOT_FOUND,
                  logData: `opssss`,
                },
              ]
            );
          }
          // booktosotre control
          const bookToStore = await bookToStoreMethod.customFindOne(
            dto.storeId,
            dto.bookId
          );

          if (!bookToStore) {
            await bookToStoreMethod.customCreate(
              dto,
              req.currentSession!.user.id
            );
          } else {
            bookToStore.quantity += dto.quantity;
            bookToStore.executor = req.currentSession!.user.id;
            await transactionalEntityManager.save(bookToStore);
          }

          return new OkResponse<boolean>(
            Code.SUCCESS_UPDATE,
            Messages.SUCCESS_UPDATE,
            true
          ); // testıng
        } catch (error) {
          throw error;
        }
      }
    );
  };
}
// bu endpoint'De okey... gozden gecırısın en son 1 saat sonra ondan sonra dırek remove etmeyı halledersın.
