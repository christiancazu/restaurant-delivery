import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column
} from 'typeorm';

@Entity('payments')
export class Payment extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      unique: true,
      length: 32
    })
    name: string;

    @Column({
      type: 'varchar',
      length: 128
    })
    description: string;
}