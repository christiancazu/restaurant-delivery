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
import { Category } from '../categories/category.entity';
import { Type } from '../types/type.entity';
import { User } from '../users/user.entity';

@Entity('plates')
export class Plate extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: 64,
      unique: true
    })
    name: string;

    @Column({
      type: 'text',
      nullable: true
    })
    description: string;

    @JoinColumn({ name: 'categoryId' })
    @ManyToOne(() => Category)
    category: Category;

    @JoinColumn({ name: 'typeId' })
    @ManyToOne(() => Type)
    type: Type;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @JoinColumn({ name: 'updatedByUserId' })
    @ManyToOne(() => User)
    updater: User;

    @Column({
      type: 'varchar',
      length: 32
    })
    avatar: string;

    @Column({ type: 'boolean' })
    enabled: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.enabled = true;
    }
}
