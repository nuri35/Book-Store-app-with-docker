import {
  IPaginatedFilterResult,
  IStoreCreationData,
} from '@/common-types/interfaces/repo.interface';
import { StoreEntity } from '@/entities/store.entity';
import DataSourceFactory from '@source/data.source';

export const StoreRepository = DataSourceFactory.source
  .getRepository(StoreEntity)
  .extend({
    async customCreate(
      addedFields: IStoreCreationData,
      currentUserId?: number
    ) {
      const { name, address, phoneNumber } = addedFields;

      const storeInstance = this.create({
        name,
        address,
        phoneNumber,
      });
      storeInstance.executor = currentUserId;
      return await this.save(storeInstance);
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

    async customFindAllWithQuery(paginateQuery: IPaginatedFilterResult) {
      const { page, limit } = paginateQuery;
      return await this.findAndCount({
        select: {
          id: true,
          name: true,
          address: true,
          phoneNumber: true,
        },
        take: limit,
        skip: (page - 1) * limit,
        order: {
          createdAt: 'DESC',
        },
      });
    },

    async customFindAllWithQueryRelated(paginateQuery: IPaginatedFilterResult) {
      const { page, limit } = paginateQuery;
      return await this.findAndCount({
        select: {
          id: true,
          createdAt: true,
          name: true,
          address: true,
          phoneNumber: true,
          bookToStores: {
            id: true,
            quantity: true,
            book: {
              id: true,
              title: true,
              author: true,
            },
          },
        },
        relations: {
          bookToStores: {
            book: true,
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
