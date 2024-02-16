import { SessionEntity } from '@/entities/session.entity';
import DataSourceFactory from '@source/data.source';
import { UserEntity } from '../../entities/user.entity';
import { TokenEntity } from '@/entities/token.entity';
import { UserPayload } from '@/common-types/interfaces/payload.interface';
import {
  SessionType,
  TokenOperationType,
} from '@/common-types/enums/type.enum';

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

    async findValidTokenBySession(
      dynamicSelect: Record<string, any>,
      payload: UserPayload
    ) {
      return await this.findOne({
        select: dynamicSelect,
        relations: {
          user: true,
          token: true,
        },
        where: [
          {
            user: {
              publicId: payload.id,
            },
            status: SessionType.Active,
            token: {
              token: payload.jti,
              operation: TokenOperationType.loginAfterValidRegistration,
            },
          },
        ],
      });
    },

    //

    async findByCurrentSessionId(sessionId: number) {
      return (await this.findOne({
        select: {
          id: true,
          status: true,
          token: {
            id: true,
            status: true,
            keyValue: true,
            expired: { date: true },
          },
          user: {
            id: true,
          },
          tokenRf: {
            id: true,
            status: true,
            keyValue: true,
            expired: { date: true },
          },
        },
        relations: {
          tokenRf: true,
          token: true,
          user: true,
        },
        where: [
          {
            id: sessionId,
          },
        ],
      })) as SessionEntity;
    },

    async updateBySessionStatus(
      sessionExist: SessionEntity,
      deviceName?: string
    ) {
      sessionExist.status = SessionType.Passive;

      sessionExist.globalDeviceName = deviceName;
      return await this.save(sessionExist);
    },

    //

    async rfTokenByPublicId(rfTokenPayload: UserPayload) {
      const { id, jti } = rfTokenPayload;
      return await this.findOne({
        select: {
          id: true,
          token: {
            id: true,
            token: true,
            keyValue: true,
            expired: { date: true },
          },
          user: {
            id: true,
          },
          tokenRf: {
            id: true,
            token: true,
            keyValue: true,
            expired: { date: true },
          },
        },
        relations: {
          tokenRf: true,
          token: true,
          user: true,
        },
        where: [
          {
            user: {
              publicId: id,
            },
            status: SessionType.Active,
            tokenRf: {
              token: jti,
              operation: TokenOperationType.refreshToken,
            },
          },
        ],
      });
    },
  });
