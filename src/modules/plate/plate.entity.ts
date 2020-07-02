import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';
import { Category } from '../category/category.entity';
import { Type } from '../type/type.entity';
import { User } from '../users/user.entity';

@Entity('plate')
export class Plate extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      unique: true,
      length: 64,
      nullable: false,
    })
    name: string;

    @Column({
      type: 'varchar',
      length: 128,
      nullable: true,
    })
    description: string;

    @JoinColumn({ name: 'category_id' })
    @ManyToOne(type => Category)
    category: Category;

    @JoinColumn({ name: 'type_id' })
    @ManyToOne(type => Type)
    type: Type;

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

    @JoinColumn({ name: 'updated_by_user_id' })
    @ManyToOne(type => User)
    updated_id: User;

    @Column({
      type: 'varchar',
      length: 32,
      nullable: false,
    })
    avatar: string;

    @Column({
      type: 'boolean',
      nullable: false,
    })
    enabled: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.enabled = true;
    }
}
