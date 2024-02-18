import { IBookCreationData } from '@/common-types/interfaces/repo.interface';
import { BookEntity } from '@/entities/book.entity';
import { StoreEntity } from '@/entities/store.entity';
import DataSourceFactory from '@source/data.source';

export const BookRepository = DataSourceFactory.source
  .getRepository(BookEntity)
  .extend({
    async customCreate(addedFields: IBookCreationData, currentUserId?: number) {
      const { title, author, publicationYear, ISBN, genre } = addedFields;

      const bookInstance = this.create({
        title,
        author,
        publicationYear,
        ISBN,
        genre,
      });
      bookInstance.executor = currentUserId;
      return await this.save(bookInstance);
    },

    async customFindOne(id: number) {
      return await this.findOne({
        select: {
          id: true,
          title: true,
          author: true,
          publicationYear: true,
          ISBN: true,
          genre: true,
        },
        where: {
          id,
        },
      });
    },
  });
