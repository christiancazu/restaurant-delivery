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
import { ASSERTS } from '@common/config/asserts.config';

@Entity('plates')
export class Plate extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: ASSERTS.PLATE.NAME_MAX_LENGTH,
      unique: true
    })
    name: string;

    @Column({
      type: 'text',
      nullable: true
    })
    description: string;

    @ManyToOne(() => Category, { nullable: false })
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @ManyToOne(() => Type, { nullable: false })
    @JoinColumn({ name: 'typeId' })
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
      length: ASSERTS.PLATE.AVATAR_MAX_LENGTH,
      nullable: true
    })
    avatar: string;

    @Column({ type: 'boolean' })
    enabled: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.enabled = true;
    }
}
