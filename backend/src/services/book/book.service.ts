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
import { NotFoundError } from '@/responses-errors/not.found.error';

@Service()
export class BookManagerService {
  private readonly dbSource = DataSourceFactory.source;

  public async createBookStore(
    dto: BookStoreCreateDto,
    req: Request
  ): Promise<CreatedResponse<StoreEntity>> {
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

          return new CreatedResponse<StoreEntity>(
            Code.SUCCESS_CREATE,
            Messages.SUCCESS_CREATE,
            resultStore
          );
        } catch (error) {
          throw error;
        }
      }
    );
  }
  //? bu service'lerin içerisinde event-subscriber'lar çalışıyor.... oncesınde findOne metotu calısıp sonrasındada user log tablosuna kayıt ediliyor.....
  public createBook = async (dto: BookCreateDto, req: Request) => {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const storeMethod = await transactionalEntityManager.withRepository(
            StoreRepository
          );
          const store = await storeMethod.customFindOne(dto.storeId);

          if (!store) {
            throw new NotFoundError(
              ErrorCode.RECORD_NOT_FOUND,
              ErrorMessages.RECORD_NOT_FOUND,
              [
                {
                  logCode: ErrorCode.RECORD_NOT_FOUND,
                  logMessage: ErrorMessages.RECORD_NOT_FOUND,
                  logData: `opsss`,
                },
              ]
            );
          }

          const bookMethod = await transactionalEntityManager.withRepository(
            BookRepository
          );
          const resultBook = await bookMethod.customCreate(
            dto,
            store,
            req.currentSession!.user.id
          );
          return new CreatedResponse<BookEntity>(
            Code.SUCCESS_CREATE,
            Messages.SUCCESS_CREATE,
            resultBook
          );
        } catch (error) {
          throw error;
        }
      }
    );
  };
}
