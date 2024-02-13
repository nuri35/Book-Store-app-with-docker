import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  LoadEvent,
  UpdateEvent,
} from 'typeorm';

@EventSubscriber()
export class EveryEventSubscriber implements EntitySubscriberInterface<any> {
  //   async beforeInsert(event: InsertEvent<any>) {
  //     const { connection, manager, entity, metadata } = event;
  //     return manager.transaction(async (transactionalManager) => {
  //       if (metadata.tableName === EntityName.Members) {
  //         const member = await transactionalManager.findOne(MemberEntity, {
  //           where: { idtaxNumber: entity.idtaxNumber },
  //         });
  //         if (member) {
  //           throw new BadRequestError(
  //             ErrorCode.DUBLICATE_COMPANY,
  //             ErrorMessages.DUBLICATE_COMPANY,
  //             [
  //               {
  //                 logCode: ErrorCode.DUBLICATE_COMPANY,
  //                 logMessage: ErrorMessages.DUBLICATE_COMPANY,
  //                 logData: `idtaxNumber: ${entity.idtaxNumber}`,
  //               },
  //             ]
  //           );
  //         }
  //       }
  //       if (
  //         metadata.tableName === EntityName.Users &&
  //         !entity.member.idtaxNumber
  //       ) {
  //         // sadece portal user add user endpointinde calısmalı..
  //         const user = await transactionalManager.findOne(UserEntity, {
  //           where: { idtaxNumber: entity.I.mail },
  //         });
  //         if (user) {
  //           throw new BadRequestError(
  //             ErrorCode.DUBLICATE_ACCOUNT,
  //             ErrorMessages.DUBLICATE_ACCOUNT,
  //             [
  //               {
  //                 logCode: ErrorCode.DUBLICATE_ACCOUNT,
  //                 logMessage: ErrorMessages.DUBLICATE_ACCOUNT,
  //                 logData: `oppppss`,
  //               },
  //             ]
  //           );
  //         }
  //       }
  //     });
  //   }
  //   async afterInsert(event: InsertEvent<any>) {
  //     const { connection, manager, entity, metadata } = event;
  //     return manager.transaction(async (transactionalManager) => {
  //       if (
  //         metadata.tableName === EntityName.Members ||
  //         metadata.tableName === EntityName.UserLogs
  //       ) {
  //         return;
  //       } else {
  //         let selectEntity;
  //         if (entity.executor) {
  //           selectEntity = entity.executor;
  //         } else {
  //           selectEntity =
  //             metadata.tableName === EntityName.Users ? entity : entity.user;
  //         }
  //         const userLog = new CreateLogData(
  //           entity.globalDeviceName,
  //           `${Messages.SUCCESS_CREATE}`,
  //           OperationType.Create,
  //           metadata.tableName,
  //           entity.id,
  //           metadata.tableName === EntityName.Token
  //             ? entity.keyValue
  //             : selectEntity,
  //           metadata.tableName === EntityName.Token
  //             ? entity.keyMemberValue
  //             : entity.member,
  //           transactionalManager
  //         );
  //         await Db.log(userLog);
  //       }
  //     });
  //   }
}
