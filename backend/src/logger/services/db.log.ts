import { UserLogEntity } from '@entities/user.log.entity';
import { TransportMsg } from '@common-types/interfaces/transport.interface';

export class Db {
  static async log(logData: TransportMsg): Promise<void> {
    const {
      device,
      explanation,
      operation,
      table,
      tableKeyId,
      user,
      transactionalEntityManager,
    } = logData;
    try {
      const userLog = new UserLogEntity();
      userLog.deviceName = device;
      userLog.explanation = explanation;
      userLog.operation = operation;
      userLog.table = table;
      userLog.tableKeyId = tableKeyId;
      userLog.user = user;

      await transactionalEntityManager.save(UserLogEntity, userLog);
    } catch (error: any) {
      throw error;
    }
  }
}
