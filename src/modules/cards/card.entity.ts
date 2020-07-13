import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from 'typeorm';
import { User } from '../users/user.entity';
import { Plate } from '../plates/plate.entity';

@Entity('cards')
export class Card extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ type: 'int' })
    stock: number;

    @Column({ type: 'int' })
    createdStock: number;

    @Column({
      type: 'decimal',
      precision: 5,
      scale: 2
    })
    price: number;

    @ManyToOne(() => User, { nullable: false })
    @JoinColumn({ name: 'updatedByUserId' })
    updater: User;

    @ManyToOne(() => Plate, { nullable: false })
    @JoinColumn({ name: 'plateId' })
    plate: Plate;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @BeforeInsert()
    createdStockEqualsToStock() {
      this.stock = this.createdStock;
    }
}
