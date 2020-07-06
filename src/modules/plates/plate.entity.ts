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
      unique: true,
      length: 64
    })
    name: string;

    @Column({
      type: 'varchar',
      length: 128,
      nullable: true
    })
    description: string;

    @JoinColumn({ name: 'category_id' })
    @ManyToOne(() => Category)
    category!: Category;

    @JoinColumn({ name: 'type_id' })
    @ManyToOne(() => Type)
    type: Type;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @JoinColumn({ name: 'updated_by_user_id' })
    @ManyToOne(() => User)
    updated_id: User;

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
