import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';
import { ASSERTS } from '@common/config/asserts.config';

@Entity('types')
export class Type extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: ASSERTS.TYPE.NAME_MAX_LENGTH,
      unique: true
    })
    name: string;

    @Column({
      type: 'varchar',
      length: ASSERTS.TYPE.DESCRIPTION_MAX_LENGTH,
      nullable: true
    })
    description: string;

    @Column({
      type: 'varchar',
      length: ASSERTS.TYPE.AVATAR_MAX_LENGTH,
      nullable: true
    })
    avatar: string;

    constructor(id: number) {
      super();
      this.id = id;
    }
}
