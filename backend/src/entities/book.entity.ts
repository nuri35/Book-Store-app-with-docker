import { Entity, Column, ManyToMany, JoinTable, Unique } from 'typeorm';
import { BaseCustomEntity } from '@entities/base.entity';
import { StoreEntity } from '@/entities/store.entity';
import { GenreType } from '@/common-types/enums/type.enum';

@Entity()
@Unique(['ISBN'])
export class BookEntity extends BaseCustomEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  publicationYear: number;

  @Column()
  ISBN: string;

  @Column({
    type: 'enum',
    enum: GenreType,
    nullable: false,
  })
  genre: GenreType;

  @ManyToMany(() => StoreEntity)
  @JoinTable()
  stores: StoreEntity[];
}
