import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import { ASSERTS } from '@common/config/asserts.config';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: ASSERTS.CATEGORY.NAME_MAX_LENGTH,
    unique: true
  })
  name: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.CATEGORY.DESCRIPTION_MAX_LENGTH,
    nullable: true
  })
  description: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.CATEGORY.AVATAR_MAX_LENGTH,
    nullable: true
  })
  avatar: string;

  constructor(id: number) {
    super();
    this.id = id;
  }
}
