import { TokenEntity } from '@/entities/token.entity';
import DataSourceFactory from '@source/data.source';
import { EntityName } from '@/common-types/enums/entity.enum';
import { ITokenCreationData } from '@/common-types/interfaces/repo.interface';
import { TokenUsabilityType } from '@common-types/enums/type.enum';

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

    async updateByTokenStatus(tokenExist: TokenEntity, deviceName?: string) {
      tokenExist.status = TokenUsabilityType.UnUsed;
      tokenExist.expired.date = new Date();
      tokenExist.globalDeviceName = deviceName;
      return await this.save(tokenExist);
    },
  });
