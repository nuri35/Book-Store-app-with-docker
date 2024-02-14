import { Column } from 'typeorm';

/**
 * Represents the details of a user.
 */
export class HumanEntity {
  @Column()
  phone: string;

  @Column({
    nullable: true,
  })
  title?: string;

  @Column()
  mail: string;
}
