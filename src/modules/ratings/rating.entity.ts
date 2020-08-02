import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

import { ASSERTS } from '@common/config/asserts.config';

@Entity('ratings')
export class Rating extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: ASSERTS.RATING.NAME,
      unique: true
    })
    name: string;

    @Column({
      type: 'varchar',
      length: ASSERTS.RATING.DESCRIPTION,
      nullable: true
    })
    description: string;

    constructor(id: number) {
      super();
      this.id = id;
    }
}
