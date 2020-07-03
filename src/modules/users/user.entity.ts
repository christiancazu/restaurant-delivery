import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  ManyToMany,
  JoinTable
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
    length: asserts.user.DOCUMENT_MAX_LENGTH
  })
  document: string;

  @Column({
    type: 'varchar',
    length: 32
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: 32
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: 32,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 32
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true
  })
  adress: string;

  @Column({
    type: 'varchar',
    length: 16,
    unique: true
  })
  phone: string;

  @Column({
    type: 'varchar',
    unique: true,
    length: 64
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true
  })
  locationLatLng: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true
  })
  avatar: string;

  @Column({ type: 'boolean' })
  enabled: boolean;

  @Column({ type: 'boolean' })
  available: boolean;

  @ManyToMany(() => Role, { cascade: true })
  @JoinTable({
    name: 'user_roles',
    joinColumns: [{ name: 'user_id' }],
    inverseJoinColumns: [{ name: 'role_id' }]
  })
  roles: Role[];

  @BeforeInsert()
  beforeInsertActions() {
    this.enabled = true;
    this.available = true;
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
