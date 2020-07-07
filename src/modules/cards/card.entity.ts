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

@Entity('cards')
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'decimal' })
    price: number;

    @ManyToOne(() => User, { nullable: true })
    @JoinColumn({ name: 'updatedByUserId' })
    user: User;

    @ManyToOne(() => Plate, { nullable: true })
    @JoinColumn({ name: 'plateId' })
    plate: Plate;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;
}
