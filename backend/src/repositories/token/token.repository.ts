import { TokenEntity } from '@/entities/token.entity';
import DataSourceFactory from '@source/data.source';
import { EntityName } from '@/common-types/enums/entity.enum';
import { ITokenCreationData } from '@/common-types/interfaces/repo.interface';

export const TokenRepository = DataSourceFactory.source
  .getRepository(TokenEntity)
  .extend({
    async customCreate(addFields: ITokenCreationData) {
      const { operation, userId, publicId, globalDeviceName } = addFields;
      const tokenInstance = this.create({
        operation,
        keyValue: userId,
        keyPublicValue: publicId,
        table: EntityName.Users,
        globalDeviceName: globalDeviceName,
      });
      return await this.save(tokenInstance);
    },
  });
