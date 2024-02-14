import {
  Entity,
  Column,
  OneToMany,
  Unique,
  BeforeInsert,
  AfterInsert,
  BeforeUpdate,
} from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { UserType } from '@common-types/enums/type.enum';
import { UserLogEntity } from '@/entities/user.log.entity';
import { SessionEntity } from '@entities/session.entity';
import { Exclude } from 'class-transformer';
import { HumanEntity, ExpiredDateEntity } from '@/entities/embeded-entities';
import { DateProvider } from '@/providers/date.provider';
import { PasswordProvider } from '@/providers/password.provider';
import crypto from 'crypto';

@Entity()
@Unique(['idtaxNumber'])
export class UserEntity extends BaseCustomEntity {
  @Column({
    type: 'enum',
    enum: UserType,
    nullable: false,
    default: UserType.Admin,
  })
  type: UserType;

  @Column()
  name: string;

  @Column()
  publicId: number;

  @BeforeInsert()
  generateId() {
    const randomBuffer = crypto.randomBytes(4); // 4 byte (32 bit) rastgele veri al
    const randomNumber = randomBuffer.readUInt32BE(0); // Rastgele sayıyı al
    const sixDigitId = (randomNumber % 900000) + 100000; // 6 haneli rakam elde et
    this.publicId = sixDigitId;
  }

  @Column()
  surname: string;

  @Column()
  idtaxNumber: string;

  @Exclude()
  @Column()
  password?: string;

  @BeforeUpdate()
  @BeforeInsert()
  async encryptPassword() {
    if (!this.password) return;
    this.password = await PasswordProvider.setEncrypt(this.password);
  }

  @AfterInsert()
  async deletePassword() {
    this.password = undefined; // Şifre alanını temizle
    delete this['password']; // Şifre alanını nesneden sil

    return { ...this }; // Şifresiz nesneyi döndür
  } //todo responslar duzeltıkten sonra sılınecek..gerek yok gıbı.

  @BeforeInsert()
  setExpiredDate() {
    if (this.expired.date) return;
    this.expired = new ExpiredDateEntity();
    this.expired.date = DateProvider.expireDatePerson(30);
  }

  @OneToMany(() => UserLogEntity, (userlog) => userlog.user, {
    cascade: true,
    nullable: false,
  })
  userlog: UserEntity[];

  @OneToMany(() => SessionEntity, (session) => session.user, {
    cascade: true,
    nullable: false,
  })
  session: SessionEntity[];

  @Column(() => HumanEntity)
  I: HumanEntity;

  @Column(() => ExpiredDateEntity)
  expired: ExpiredDateEntity;
}