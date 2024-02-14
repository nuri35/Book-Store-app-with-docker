import { Service } from 'typedi';
import DataSourceFactory from '@source/data.source';
import { EntityManager } from 'typeorm';
import { Response } from 'express';
import { UserEntity } from '@entities/user.entity';
import { SessionEntity } from '@entities/session.entity';
import AuthRegisterDto from '@controllers/auth/dto/auth.register.dto';
import { Code, Messages, ErrorCode, ErrorMessages } from '@bestnetlib/common';
import { CreatedResponse } from '@responses/created.response';
import { TokenOperationType } from '@common-types/enums/type.enum';
// import { ElectronicMessaging } from '@notifications/index';
import { OkResponse } from '@responses/ok.response';
import { UserPayload } from '@common-types/interfaces/payload.interface';
import { InvalidTokenError } from '@/responses-errors/invalid.token.error';
import { NotFoundError } from '@/responses-errors/not.found.error';
import AuthLoginDto from '@/controllers/auth/dto/auth.login.dto';
import { PasswordProvider } from '@/providers/password.provider';
import { JwtProvider } from '@/providers/jwt.provider';
// import TransformService from '@/services/conversion/data.transform';
import VerifyEmailDto from '@/controllers/auth/dto/auth.verify.email.dto';
// import IdentifierResDto from '@/controllers/auth/response-dto/identifier.dto';
// import LoginResDto from '@/controllers/member/response-dto/login.dto';
// import { MemberRepository } from '@/repositories/member/member.repository';
// import { UserRepository } from '@/repositories/user/user.repository';
// import { TokenRepository } from '@/repositories/token/token.repository';
// import { SessionRepository } from '@/repositories/session/session.repository';
// import { UserHelper } from '@/services/helper/user/user.helper';
// import { SessionHelper } from '@/services/helper/session/session.helper';

@Service()
export class AuthService {
  private readonly dbSource = DataSourceFactory.source;

  public async register(dto: AuthRegisterDto) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        try {
          //  Promise<CreatedResponse<IdentifierResDto>>
          //   const newMember = await transactionalEntityManager
          //     .withRepository(MemberRepository)
          //     .customCreate(dto);
          //   const newUser = await transactionalEntityManager
          //     .withRepository(UserRepository)
          //     .customCreate(dto, newMember);
          //   const newToken = await transactionalEntityManager
          //     .withRepository(TokenRepository)
          //     .customCreate({
          //       operation: TokenOperationType.verifyAfterRegistration,
          //       userId: newUser.id,
          //       memberId: newMember.id,
          //       publicId: newUser.publicId,
          //       app: newUser.app,
          //       globalDeviceName: newUser.globalDeviceName,
          //     });
          //   new ElectronicMessaging({
          //     contact:
          //       newUser.app.type === ApplicationType.Src
          //         ? newUser.I.phone
          //         : newUser.I.mail,
          //     content: {
          //       token: newToken.clientToken,
          //       fullName: newUser.name + ' ' + newUser.surname,
          //     },
          //     operation:
          //       newToken.operation as TokenOperationType.verifyAfterRegistration,
          //   }).load(newToken.app.type);
          //   const convertData = TransformService.convert<
          //     IdentifierResDto,
          //     UserEntity
          //   >(newUser, IdentifierResDto, 'excludeAll');
          //   return new CreatedResponse<IdentifierResDto>(
          //     Code.SUCCESS_CREATE,
          //     Messages.SUCCESS_CREATE,
          //     convertData
          //   );
        } catch (error) {
          throw error;
        }
      }
    );
  }

  public async verifyEmail(dto: VerifyEmailDto) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Promise<OkResponse<boolean>>
        //         let tokenObj: UserPayload;
        //         const { token } = dto;
        //         try {
        //           tokenObj = JwtProvider.verifyJWT(
        //             token,
        //             TokenOperationType.verifyAfterRegistration
        //           );
        //           const tokenExist = await transactionalEntityManager
        //             .withRepository(TokenRepository)
        //             .findByToken(
        //               {
        //                 token: tokenObj.jti,
        //                 keyPublicValue: tokenObj.id,
        //               },
        //               TokenOperationType.verifyAfterRegistration
        //             );
        //           if (!tokenExist) {
        //             throw new NotFoundError(
        //               ErrorCode.RECORD_NOT_FOUND,
        //               ErrorMessages.RECORD_NOT_FOUND,
        //               [
        //                 {
        //                   logCode: ErrorCode.RECORD_NOT_FOUND,
        //                   logMessage: ErrorMessages.RECORD_NOT_FOUND,
        //                   logData: `Opps!`,
        //                 },
        //               ]
        //             );
        //           }
        //           const userMethod =
        //             transactionalEntityManager.withRepository(UserRepository);
        //           const userExist = await userMethod.findByPublicId(tokenObj.id);
        //           const resultUp = await userMethod.customUpdate(userExist, {
        //             rec: {
        //               status: recStatusType.NewMember,
        //             },
        //             globalDeviceName: dto.deviceName,
        //           });
        //           await transactionalEntityManager
        //             .withRepository(MemberRepository)
        //             .updateByMemberStatus(
        //               userExist.member,
        //               resultUp.id,
        //               recStatusType.NewMember
        //             );
        //           await transactionalEntityManager
        //             .withRepository(TokenRepository)
        //             .updateByTokenStatus(tokenExist, dto.deviceName);
        //           return new OkResponse<boolean>(
        //             Code.SUCCESS_UPDATE,
        //             Messages.SUCCESS_UPDATE,
        //             true
        //           );
        //         } catch (error: any) {
        //           if (error.name === 'TokenExpiredError') {
        //             throw new InvalidTokenError(
        //               ErrorCode.EXPIRED_TOKEN,
        //               ErrorMessages.EXPIRED_TOKEN,
        //               [
        //                 {
        //                   logCode: ErrorCode.EXPIRED_TOKEN,
        //                   logMessage: ErrorMessages.EXPIRED_TOKEN,
        //                   logData: `Opps!`,
        //                 },
        //               ]
        //             );
        //           }
        //           if (error.name === 'JsonWebTokenError') {
        //             throw new InvalidTokenError(
        //               ErrorCode.INVALID_TOKEN,
        //               ErrorMessages.INVALID_TOKEN,
        //               [
        //                 {
        //                   logCode: ErrorCode.INVALID_TOKEN,
        //                   logMessage: ErrorMessages.INVALID_TOKEN,
        //                   logData: `Opps!`,
        //                 },
        //               ]
        //             );
        //           }
        //           throw error;
        //         }
      }
    );
  }

  public async login(dto: AuthLoginDto, res: Response) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // Promise<OkResponse<LoginResDto>>
        //     const { userPassword, identifierField } = dto;
        //     try {
        //       const userMethod =
        //         transactionalEntityManager.withRepository(UserRepository);
        //       const userExist = await userMethod.findOneIdtaxNumber(
        //         identifierField
        //       );
        //       if (!userExist) {
        //         throw new NotFoundError(
        //           ErrorCode.INVALID_USERID,
        //           ErrorMessages.INVALID_USERID,
        //           [
        //             {
        //               logCode: ErrorCode.INVALID_USERID,
        //               logMessage: ErrorMessages.INVALID_USERID,
        //               logData: `${identifierField}`,
        //             },
        //           ]
        //         );
        //       }
        //       UserHelper.controlLogicExpireDate(userExist);
        //       await PasswordProvider.compare(userExist.password!, userPassword);
        //       const sessionMethod =
        //         transactionalEntityManager.withRepository(SessionRepository);
        //       const sessionExist = await sessionMethod.FindIsOpenSession(
        //         userExist.id
        //       );
        //       if (sessionExist) {
        //         SessionHelper.warningOpenSession(
        //           sessionExist,
        //           userExist,
        //           dto.deviceName
        //         );
        //       }
        //       const tokenMethod =
        //         transactionalEntityManager.withRepository(TokenRepository);
        //       const tokenInstance = await tokenMethod.customCreate({
        //         operation: TokenOperationType.loginAfterValidRegistration,
        //         userId: userExist.id,
        //         memberId: userExist.member.id,
        //         publicId: userExist.publicId,
        //         app: userExist.app,
        //       });
        //       const tokenInstanceRf = await tokenMethod.customCreate({
        //         operation: TokenOperationType.refreshToken,
        //         userId: userExist.id,
        //         memberId: userExist.member.id,
        //         publicId: userExist.publicId,
        //         app: userExist.app,
        //       });
        //       await sessionMethod.customCreate(
        //         userExist,
        //         {
        //           tokenInstance,
        //           tokenInstanceRf,
        //         },
        //         dto.deviceName,
        //         dto.deviceModel
        //       );
        //       UserHelper.startCookie(tokenInstanceRf.clientRfToken, res);
        //       const convertData = TransformService.convert<LoginResDto, UserEntity>(
        //         userExist,
        //         LoginResDto,
        //         'excludeAll'
        //       ).addCustomProperty('token', tokenInstance.clientToken);
        //       return new OkResponse<LoginResDto>(
        //         Code.SUCCESS,
        //         Messages.SUCCESS,
        //         convertData
        //       );
        //     } catch (error) {
        //       throw error;
        //     }
      }
    );
  }

  public async logOut(currentSession: SessionEntity, res: Response) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // try {
        //   const sessionMethod =
        //     transactionalEntityManager.withRepository(SessionRepository);
        //   const sessionExist = await sessionMethod.findByCurrentSessionId(
        //     currentSession.id
        //   );
        //   await sessionMethod.updateBySessionStatus(sessionExist);
        //   await transactionalEntityManager
        //     .withRepository(TokenRepository)
        //     .updateByTokenStatus(sessionExist.token);
        //   await transactionalEntityManager
        //     .withRepository(TokenRepository)
        //     .updateByTokenStatus(sessionExist.tokenRf);
        //   res.clearCookie('jwt');
        //   return new OkResponse<boolean>(Code.SUCCESS, Messages.SUCCESS, true);
        // } catch (error) {
        //   throw error;
        // }
      }
    );
  }

  public async reNewToken(rfTokenPayload: UserPayload, res: Response) {
    return await this.dbSource.manager.transaction(
      async (transactionalEntityManager: EntityManager) => {
        // const { id } = rfTokenPayload;
        // try {
        //   const sessionMethod =
        //     transactionalEntityManager.withRepository(SessionRepository);
        //   const tokenMethod =
        //     transactionalEntityManager.withRepository(TokenRepository);
        //   const sessionExist = await sessionMethod.rfTokenByPublicId(
        //     rfTokenPayload
        //   );
        //   if (!sessionExist) {
        //     res.clearCookie('jwt');
        //     throw new ForbiddenError(
        //       ErrorCode.INVALID_TOKEN,
        //       ErrorMessages.INVALID_TOKEN,
        //       [
        //         {
        //           logCode: ErrorCode.INVALID_TOKEN,
        //           logMessage: ErrorMessages.INVALID_TOKEN,
        //           logData: `!!!ops`,
        //         },
        //       ]
        //     );
        //   }
        //   const result = await UserHelper.rfTokenExpiredUserCntrol(
        //     sessionExist.user,
        //     sessionExist,
        //     sessionMethod,
        //     tokenMethod
        //   );
        //   if (!result) {
        //     res.clearCookie('jwt');
        //     return new ForbiddenError(
        //       ErrorCode.INVALID_TOKEN,
        //       ErrorMessages.INVALID_TOKEN,
        //       [
        //         {
        //           logCode: ErrorCode.INVALID_TOKEN,
        //           logMessage: ErrorMessages.INVALID_TOKEN,
        //           logData: `!!ops`,
        //         },
        //       ]
        //     );
        //   }
        //   const gnValue = JwtProvider.signJWT(
        //     id,
        //     TokenOperationType.refreshToken
        //   );
        //   await tokenMethod.extendToken(
        //     sessionExist.tokenRf,
        //     gnValue.jwtid,
        //     TokenOperationType.refreshToken
        //   );
        //   res.clearCookie('jwt');
        //   UserHelper.startCookie(gnValue.token, res);
        //   const tokenUpAccess = JwtProvider.signJWT(
        //     id,
        //     TokenOperationType.loginAfterValidRegistration
        //   );
        //   await tokenMethod.extendToken(
        //     sessionExist.token,
        //     tokenUpAccess.jwtid,
        //     TokenOperationType.loginAfterValidRegistration
        //   );
        //   return new OkResponse<ReNewTokenResponse>(
        //     Code.SUCCESS_UPDATE,
        //     Messages.SUCCESS_UPDATE,
        //     {
        //       token: tokenUpAccess.token,
        //     }
        //   );
        // } catch (error: any) {
        //   throw error;
        // }
      }
    );
  }
}
