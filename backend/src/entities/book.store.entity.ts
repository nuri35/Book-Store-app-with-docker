import { Entity, Column, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { UserEntity } from '@entities/user.entity';

@Entity()
export class UserLogEntity extends BaseCustomEntity {
  @ManyToOne(() => UserEntity, (user) => user.userlog, {
    eager: false,
    nullable: false,
  })
  user: UserEntity;
}
