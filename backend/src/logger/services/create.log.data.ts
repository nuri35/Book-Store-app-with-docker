import { OperationType } from '@/common-types/enums/type.enum';
import { UserEntity } from '@entities/user.entity';
import { EntityManager } from 'typeorm';

export class CreateLogData {
  constructor(
    public device: string | undefined,
    public explanation: string,
    public operation: OperationType,
    public table: string,
    public tableKeyId: number,
    public user: UserEntity,
    public transactionalEntityManager: EntityManager
  ) {}
}
