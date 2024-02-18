import AddStockDto from '@/controllers/book/dto/add.stock.dto';
import { BookToStoreEntity } from '@/entities/book.to.store.entity';
import DataSourceFactory from '@source/data.source';

export const BookToStoreRepository = DataSourceFactory.source
  .getRepository(BookToStoreEntity)
  .extend({
    async customCreate(dto: AddStockDto, currentUserId?: number) {
      const { bookId, storeId, quantity } = dto;
      const bookToStoreInstance = this.create({
        bookId,
        storeId,
        quantity,
      });
      bookToStoreInstance.executor = currentUserId;
      return await this.save(bookToStoreInstance);
    },

    async customFindOne(storeId: number, bookId: number) {
      return await this.findOne({
        where: {
          storeId,
          bookId,
        },
      });
    },
  });
