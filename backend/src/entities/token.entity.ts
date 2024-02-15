import { Entity, Column, BeforeInsert, Unique, OneToMany } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import {
  TokenUsabilityType,
  TokenOperationType,
} from '@/common-types/enums/type.enum';
import { JwtProvider } from '@/providers/jwt.provider';
import { ExpiredDateEntity } from '@/entities/embeded-entities';
import { DateProvider } from '@/providers/date.provider';
import { SessionEntity } from '@entities/session.entity';

@Entity()
@Unique(['token'])
export class TokenEntity extends BaseCustomEntity {
  public clientToken: string;
  public clientRfToken: string;

  @Column()
  token: string;

  @BeforeInsert()
  async setToken() {
    const tokenObj = JwtProvider.signJWT(this.keyPublicValue, this.operation);
    this.token = tokenObj.jwtid;
    if (this.operation === TokenOperationType.refreshToken) {
      this.clientRfToken = tokenObj.token;
    } else {
      this.clientToken = tokenObj.token;
    }
  }

  @Column({
    type: 'enum',
    enum: TokenOperationType,
  })
  operation: TokenOperationType;

  @Column({
    type: 'enum',
    enum: TokenUsabilityType,
    default: TokenUsabilityType.Used,
  })
  status: TokenUsabilityType;

  @Column()
  keyValue: number;

  @Column()
  keyPublicValue: number;

  @Column()
  table: string; //   user tablosunu

  @Column(() => ExpiredDateEntity)
  expired: ExpiredDateEntity;

  @BeforeInsert()
  setExpiredDate() {
    this.expired = new ExpiredDateEntity();
    this.expired.date = DateProvider.expireDateToken(this.operation);
  }

  @OneToMany(() => SessionEntity, (session) => session.token, {
    cascade: true,
    nullable: false,
  })
  session: SessionEntity[];

  @OneToMany(() => SessionEntity, (session) => session.tokenRf, {
    cascade: true,
    nullable: false,
  })
  sessionRf: SessionEntity[];
}
