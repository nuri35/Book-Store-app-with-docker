import {
  IBookCreationData,
  IPaginatedFilterResult,
} from '@/common-types/interfaces/repo.interface';
import { BookEntity } from '@/entities/book.entity';
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
        },
        where: {
          id,
        },
      });
    },

    async customFindAllWithQueryRelated(paginateQuery: IPaginatedFilterResult) {
      const { page, limit } = paginateQuery;
      return this.findAndCount({
        select: {
          id: true,
          createdAt: true,
          author: true,
          title: true,
          ISBN: true,
          genre: true,
          bookToStores: {
            id: true,
            quantity: true,
            store: {
              id: true,
              name: true,
              address: true,
              phoneNumber: true,
            },
          },
        },
        relations: {
          bookToStores: {
            store: true,
          },
        },
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC',
        },
      });
    },
  });
