import { Entity, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';

import { BookEntity } from '@entities/book.entity';

@Entity()
export class StoreEntity extends BaseCustomEntity {
  //
}
