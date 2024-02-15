import { UserEntity } from '@/entities/user.entity';
import { EntityManager } from 'typeorm';
import { OperationType } from '@common-types/enums/type.enum';

export interface TransportMsg {
  device: string | undefined;
  explanation: string;
  operation: OperationType;
  table: string;
  tableKeyId: number;
  user: UserEntity;
  transactionalEntityManager: EntityManager;
}
