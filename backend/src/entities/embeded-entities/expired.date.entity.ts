import { Column } from 'typeorm';

export class ExpiredDateEntity {
  @Column()
  date: Date;
}
