import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import * as bcrypt from 'bcryptjs';
import { Role } from '../roles/role.entity';

@Entity('users')
export class User extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: 25
  })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({ name: 'users_roles', })
  roles: Role[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @BeforeInsert()
  async emailLowerCase(): Promise<void> {
    this.email = this.email.toLowerCase();
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
