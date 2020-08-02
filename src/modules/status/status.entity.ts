import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

import { ASSERTS } from '@common/config/asserts.config';

@Entity('status')
export class Status extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: ASSERTS.STATUS.NAME,
      unique: true
    })
    name: string;

    @Column({
      type: 'varchar',
      length: ASSERTS.STATUS.DESCRIPTION,
      nullable: true
    })
    description: string;

    constructor(id: number) {
      super();
      this.id = id;
    }
}
