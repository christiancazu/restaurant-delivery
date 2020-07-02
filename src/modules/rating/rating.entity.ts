import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

@Entity('rating')
export class Rating extends BaseEntity {
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
}
