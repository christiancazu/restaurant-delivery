import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Plate } from '../plate/plate.entity';

@Entity('card')
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'int',
      nullable: false,
    })
    stock: number;

    @Column({
      type: 'decimal',
      nullable: true,
    })
    price: number;

    @ManyToOne(() => User,{ nullable: true, })
    @JoinColumn({ name: 'updated_by_user_id', })
    updated_by_id: User;

    @ManyToOne(() => Plate,{ nullable: true, })
    @JoinColumn({ name: 'plate_id', })
    plate: Plate;

    @CreateDateColumn()
    @Column({
      type: 'timestamp',
      nullable: false,
    })
    created_at: Date;

    @UpdateDateColumn()
    @Column({
      type: 'timestamp',
      nullable: false,
    })
    updated_at: Date;
}
