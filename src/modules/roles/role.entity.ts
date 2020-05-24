import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

import { Roles } from './enums/roles.enum';

@Entity('roles')
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('enum', {
    enum: Roles,
    default: Roles.USER
  })
  name: Roles

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true
  })
  description: string;
}
