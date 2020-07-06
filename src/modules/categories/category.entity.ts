import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('categories')
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: 32,
    unique: true
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 128
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true
  })
  avatar: string;

  constructor(id: number) {
    super();
    this.id = id;
  }
}
