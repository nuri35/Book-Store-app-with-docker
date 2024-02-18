import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { BadRequestError } from '@/responses-errors/bad.request.error';
import { ErrorCode, ErrorMessages, Messages } from '@bestnetlib/common';
import { EntityName } from '@/common-types/enums/entity.enum';
import { UserEntity } from '../user.entity';
import { StoreEntity } from '@/entities/store.entity';
import { OperationType } from '@/common-types/enums/type.enum';
import { CreateLogData } from '@/logger/services/create.log.data';
import { Db } from '@logger/services/db.log';
import { BookEntity } from '../book.entity';

@EventSubscriber()
export class EveryEventSubscriber implements EntitySubscriberInterface<any> {
  async beforeInsert(event: InsertEvent<any>) {
    const { connection, manager, entity, metadata } = event;

    return manager.transaction(async (transactionalManager) => {
      if (metadata.tableName === EntityName.Users) {
        const user = await transactionalManager.findOne(UserEntity, {
          where: { mail: entity.mail },
        });

        if (user) {
          throw new BadRequestError(
            ErrorCode.DUBLICATE_ACCOUNT,
            ErrorMessages.DUBLICATE_ACCOUNT,
            [
              {
                logCode: ErrorCode.DUBLICATE_ACCOUNT,
                logMessage: ErrorMessages.DUBLICATE_ACCOUNT,
                logData: `oppppss`,
              },
            ]
          );
        }
      }

      if (metadata.tableName === EntityName.Store) {
        const store = await transactionalManager.findOne(StoreEntity, {
          where: { phoneNumber: entity.phoneNumber },
        });

        if (store) {
          throw new BadRequestError(
            ErrorCode.RECORD_NOT_FOUND,
            ErrorMessages.DUBLICATE_RECORD,
            [
              {
                logCode: ErrorCode.RECORD_NOT_FOUND,
                logMessage: ErrorMessages.DUBLICATE_RECORD,
                logData: `oppppss`,
              },
            ]
          );
        }
      }
      // book control
      if (metadata.tableName === EntityName.Book) {
        const book = await transactionalManager.findOne(BookEntity, {
          where: { ISBN: entity.ISBN },
        });

        if (book) {
          throw new BadRequestError(
            ErrorCode.RECORD_NOT_FOUND,
            ErrorMessages.DUBLICATE_RECORD,
            [
              {
                logCode: ErrorCode.RECORD_NOT_FOUND,
                logMessage: ErrorMessages.DUBLICATE_RECORD,
                logData: `oppppss`,
              },
            ]
          );
        }
      }
    });
  }

  async afterInsert(event: InsertEvent<any>) {
    const { connection, manager, entity, metadata } = event;
    return manager.transaction(async (transactionalManager) => {
      if (metadata.tableName === EntityName.UserLogs) {
        return;
      } else {
        let selectEntity;
        if (entity.executor) {
          selectEntity = entity.executor;
        } else {
          selectEntity =
            metadata.tableName === EntityName.Users ? entity : entity.user;
        }
        const userLog = new CreateLogData(
          entity.globalDeviceName,
          `${Messages.SUCCESS_CREATE}`,
          OperationType.Create,
          metadata.tableName,
          entity.id,
          metadata.tableName === EntityName.Token
            ? entity.keyValue
            : selectEntity,
          transactionalManager
        );
        await Db.log(userLog);
      }
    });
  }
}
