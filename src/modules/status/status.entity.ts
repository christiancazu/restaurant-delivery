import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('status')
export class Status extends BaseEntity {
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
      length: 128,
      nullable: true
    })
    description: string;
}
