import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { SessionType } from '@common-types/enums/type.enum';
import { UserEntity } from '@entities/user.entity';
import { TokenEntity } from '@entities/token.entity';

@Entity()
@Index('idx_session_statoken', ['status', 'token'])
export class SessionEntity extends BaseCustomEntity {
  @Column()
  deviceName: string;

  @Column()
  deviceModel: string;

  @Column({
    type: 'enum',
    enum: SessionType,
    default: SessionType.Active,
  })
  status: SessionType;

  @ManyToOne(() => UserEntity, (user) => user.session, {
    eager: false,
    nullable: false,
  })
  user: UserEntity;

  @ManyToOne(() => TokenEntity, (token) => token.session, {
    eager: false,
    nullable: false,
  })
  token: TokenEntity;

  @ManyToOne(() => TokenEntity, (token) => token.sessionRf, {
    eager: false,
    nullable: false,
  })
  tokenRf: TokenEntity;
}
