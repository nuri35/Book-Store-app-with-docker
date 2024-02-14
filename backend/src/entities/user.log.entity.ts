import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { UserEntity } from '@entities/user.entity';
import { OperationType } from '@common-types/enums/type.enum';

@Entity()
export class UserLogEntity extends BaseCustomEntity {
  @Column({
    nullable: true,
  })
  deviceName?: string;

  @Column()
  explanation: string; // log açıklaması

  @Column({
    type: 'enum',
    enum: OperationType,
  })
  operation: OperationType;

  @Column()
  table: string; // tablo adı

  @Column()
  tableKeyId: number;

  @ManyToOne(() => UserEntity, (user) => user.userlog, {
    eager: false,
    nullable: false,
  })
  user: UserEntity;
}
