import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('category')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 32,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  avatar: string;
}