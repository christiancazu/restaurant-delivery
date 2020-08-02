import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert
} from 'typeorm';

import { ASSERTS } from '@common/config/asserts.config';

@Entity('vehicles')
export class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: ASSERTS.VEHICLES.LICENSE_PLATE,
      unique: true
    })
    licencePlate: string;

    @Column({
      type: 'varchar',
      length: ASSERTS.VEHICLES.TYPE,
      default: 'MOTO'
    })
    type: string;

    @Column({ type: 'int' })
    capability: number;

    @Column({
      type: 'boolean',
      default: true
    })
    available: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.available = true;
    }
}

