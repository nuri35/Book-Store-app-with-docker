import { Service } from 'typedi';
import DataSourceFactory from '@source/data.source';
import { EntityManager } from 'typeorm';
import { Response } from 'express';
import { UserEntity } from '@entities/user.entity';
import { SessionEntity } from '@entities/session.entity';
import AuthRegisterDto from '@controllers/auth/dto/auth.register.dto';
import { Code, ErrorCode, ErrorMessages, Messages } from '@bestnetlib/common';
import { CreatedResponse } from '@responses/created.response';
import { TokenOperationType } from '@common-types/enums/type.enum';
import { ElectronicMessaging } from '@notifications/index';
import { UserPayload } from '@common-types/interfaces/payload.interface';
import AuthLoginDto from '@/controllers/auth/dto/auth.login.dto';
import TransformService from '@/services/conversion/data.transform';
import { UserRepository } from '@/repositories/user/user.repository';
import IdentifierResDto from '@/controllers/auth/response-dto/identifier.dto';
import { NotFoundError } from '@/responses-errors/not.found.error';
import { PasswordProvider } from '@/providers/password.provider';
import { TokenRepository } from '@/repositories/token/token.repository';
import { OkResponse } from '@/responses/ok.response';
import { UserHelper } from '../helper/user/user.helper';
import LoginResDto from '@/controllers/auth/response-dto/login.dto';
import { SessionRepository } from '@/repositories/session/session.repository';
import { ForbiddenError } from '@/responses-errors/forbidden.error';
import { JwtProvider } from '@/providers/jwt.provider';
import { ConflictError } from '@/responses-errors/conflict.error';

@Service()
export class AuthService {
  private readonly dbSource = DataSourceFactory.source;

  public async register(dto: AuthRegisterDto) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const newUser = await transactionalEntityManager
            .withRepository(UserRepository)
            .customCreate(dto);

          // email... module system...
          new ElectronicMessaging({
            contact: newUser.mail,
            content: {
              fullName: newUser.name + ' ' + newUser.surname,
            },
            operation: TokenOperationType.welcomeAfterRegistration,
          }).load();
          const convertData = TransformService.convert<
            IdentifierResDto,
            UserEntity
          >(newUser, IdentifierResDto, 'excludeAll');
          return new CreatedResponse<IdentifierResDto>(
            Code.SUCCESS_CREATE,
            Messages.SUCCESS_CREATE,
            convertData
          );
        } catch (error) {
          throw error;
        }
      }
    );
  }

  public async login(dto: AuthLoginDto, res: Response) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { userPassword, userName } = dto;
        try {
          const userMethod =
            transactionalEntityManager.withRepository(UserRepository);
          const userExist = await userMethod.findOneByUserName(userName);
          if (!userExist) {
            throw new NotFoundError(
              ErrorCode.INVALID_USERID,
              ErrorMessages.INVALID_USERID,
              [
                {
                  logCode: ErrorCode.INVALID_USERID,
                  logMessage: ErrorMessages.INVALID_USERID,
                  logData: `${userName}`,
                },
              ]
            );
          }

          await PasswordProvider.compare(userExist.password!, userPassword);

          const sessionMethod =
            transactionalEntityManager.withRepository(SessionRepository);

          const sessionExist = await sessionMethod.FindIsOpenSession(
            userExist.id
          );

          if (sessionExist) {
            throw new ConflictError(
              ErrorCode.DUBLICATE_SESSION,
              ErrorMessages.DUBLICATE_SESSION,
              [
                {
                  logCode: ErrorCode.DUBLICATE_SESSION,
                  logMessage: ErrorMessages.DUBLICATE_SESSION,
                  logData: `opssss`,
                },
              ]
            );
          }

          const tokenMethod =
            transactionalEntityManager.withRepository(TokenRepository);

          const tokenInstance = await tokenMethod.customCreate({
            operation: TokenOperationType.loginAfterValidRegistration,
            userId: userExist.id,
            publicId: userExist.publicId,
          });
          const tokenInstanceRf = await tokenMethod.customCreate({
            operation: TokenOperationType.refreshToken,
            userId: userExist.id,
            publicId: userExist.publicId,
          });

          await sessionMethod.customCreate(
            userExist,
            {
              tokenInstance,
              tokenInstanceRf,
            },
            dto.deviceName,
            dto.deviceModel
          );

          UserHelper.startCookie(tokenInstanceRf.clientRfToken, res);
          const convertData = TransformService.convert<LoginResDto, UserEntity>(
            userExist,
            LoginResDto,
            'excludeAll'
          ).addCustomProperty('token', tokenInstance.clientToken);
          return new OkResponse<LoginResDto>(
            Code.SUCCESS,
            Messages.SUCCESS,
            convertData
          );
        } catch (error) {
          throw error;
        }
      }
    );
  }

  public async logOut(currentSession: SessionEntity, res: Response) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          const sessionMethod =
            transactionalEntityManager.withRepository(SessionRepository);
          const sessionExist = await sessionMethod.findByCurrentSessionId(
            currentSession.id
          );
          await sessionMethod.updateBySessionStatus(sessionExist);
          await transactionalEntityManager
            .withRepository(TokenRepository)
            .updateByTokenStatus(sessionExist.token);
          await transactionalEntityManager
            .withRepository(TokenRepository)
            .updateByTokenStatus(sessionExist.tokenRf);
          res.clearCookie('jwt');
          return new OkResponse<boolean>(Code.SUCCESS, Messages.SUCCESS, true);
        } catch (error) {
          throw error;
        }
      }
    );
  }

  public async reNewToken(rfTokenPayload: UserPayload, res: Response) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        const { id } = rfTokenPayload;
        try {
          const sessionMethod =
            transactionalEntityManager.withRepository(SessionRepository);
          const tokenMethod =
            transactionalEntityManager.withRepository(TokenRepository);
          const sessionExist = await sessionMethod.rfTokenByPublicId(
            rfTokenPayload
          );
          if (!sessionExist) {
            res.clearCookie('jwt');
            throw new ForbiddenError(
              ErrorCode.INVALID_TOKEN,
              ErrorMessages.INVALID_TOKEN,
              [
                {
                  logCode: ErrorCode.INVALID_TOKEN,
                  logMessage: ErrorMessages.INVALID_TOKEN,
                  logData: `!!!ops`,
                },
              ]
            );
          }

          const gnValue = JwtProvider.signJWT(
            id,
            TokenOperationType.refreshToken
          );
          await tokenMethod.extendToken(
            sessionExist.tokenRf,
            gnValue.jwtid,
            TokenOperationType.refreshToken
          );
          res.clearCookie('jwt');
          UserHelper.startCookie(gnValue.token, res);
          const tokenUpAccess = JwtProvider.signJWT(
            id,
            TokenOperationType.loginAfterValidRegistration
          );
          await tokenMethod.extendToken(
            sessionExist.token,
            tokenUpAccess.jwtid,
            TokenOperationType.loginAfterValidRegistration
          );
          return new OkResponse<{ token: string }>(
            Code.SUCCESS_UPDATE,
            Messages.SUCCESS_UPDATE,
            {
              token: tokenUpAccess.token,
            }
          );
        } catch (error: any) {
          throw error;
        }
      }
    );
  }
}
