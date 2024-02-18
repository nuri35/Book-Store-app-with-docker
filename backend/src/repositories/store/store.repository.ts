import { IStoreCreationData } from '@/common-types/interfaces/repo.interface';
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
          name: true,
          address: true,
          phoneNumber: true,
        },
        where: {
          id,
        },
      });
    },
  });
