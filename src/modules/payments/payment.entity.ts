import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

import { ASSERTS } from '@common/config/asserts.config';

@Entity('payments')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: ASSERTS.PAYMENT.NAME,
      unique: true
    })
    name: string;

    @Column({
      type: 'varchar',
      length: ASSERTS.PAYMENT.DESCRIPTION
    })
    description: string;

    constructor(id: number = null) {
      super();
      this.id = id;
    }
}
