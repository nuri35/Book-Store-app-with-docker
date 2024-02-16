import { SessionEntity } from '@/entities/session.entity';
import DataSourceFactory from '@source/data.source';
import { UserEntity } from '../../entities/user.entity';
import { TokenEntity } from '@/entities/token.entity';

interface TokenInfo {
  tokenInstance: TokenEntity;
  tokenInstanceRf: TokenEntity;
}

export const SessionRepository = DataSourceFactory.source
  .getRepository(SessionEntity)
  .extend({
    async customCreate(
      userExist: UserEntity,
      token: TokenInfo,
      deviceName: string,
      deviceModel: string
    ) {
      const { tokenInstance, tokenInstanceRf } = token;
      const sessionInstance = this.create({
        user: userExist,
        token: tokenInstance,
        tokenRf: tokenInstanceRf,
        globalDeviceName: deviceName,
        deviceName: deviceName,
        deviceModel: deviceModel,
      });
      return await this.save(sessionInstance);
    },
  });
