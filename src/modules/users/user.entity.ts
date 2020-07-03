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
import { asserts } from '@common/config/asserts';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
    length: asserts.user.DOCUMENT_MAX_LENGTH,
    nullable: false,
  })
  document: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 32,
    unique: true,
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  adress: string;

  @Column({
    type: 'varchar',
    length: 16,
    unique: true,
    nullable: false,
  })
  phone: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 64,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
  })
  locationLatLng: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  avatar: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  enabled: boolean;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({ name: 'users_roles' })
  roles: Role[];

  @BeforeInsert()
  beforeInsertActions() {
    this.enabled = true;
  }

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
