import { Request } from 'express';
import { Service } from 'typedi';
import DataSourceFactory from '@source/data.source';
import { EntityManager } from 'typeorm';
import BookStoreCreateDto from '@/controllers/book/dto/book.create.dto';
import { BookEntity } from '@/entities/book.entity';
import { StoreEntity } from '@/entities/store.entity';

@Service()
export class BookManagerService {
  private readonly dbSource = DataSourceFactory.source;

  public async createBookStore(dto: BookStoreCreateDto, req: Request) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const bookStore = new StoreEntity();
        const book = new BookEntity();
        // try {
        //   const userMethod = await transactionalEntityManager.withRepository(
        //     UserRepository
        //   );
        //   const resultUser = await userMethod.customCreate(
        //     dto,
        //     req.currentSession!.user.id
        //   );
        //   const convertData = TransformService.convert<
        //     InitialResDto,
        //     UserEntity
        //   >(resultUser, InitialResDto, 'excludeAll');
        //   return new CreatedResponse<InitialResDto>(
        //     Code.SUCCESS_CREATE,
        //     Messages.SUCCESS_CREATE,
        //     convertData
        //   );
        // } catch (error) {
        //   throw error;
        // }
      }
    );
  }
}
