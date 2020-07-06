import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from '../users/user.entity';
import { Plate } from '../plates/plate.entity';

@Entity('card')
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'decimal' })
    price: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'updated_by_user_id' })
    updated_by_id: User;

    @ManyToOne(() => Plate, { nullable: true })
    @JoinColumn({ name: 'plate_id' })
    plate: Plate;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;
}
