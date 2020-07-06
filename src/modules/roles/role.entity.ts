import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

import { ROLES } from './enums/roles.enum';

@Entity('roles')
export class Role extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('enum', {
    enum: ROLES,
    default: ROLES.CLIENT
  })
  name: ROLES

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
    select: false
  })
  description: string;
}
