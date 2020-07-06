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
import { ASSERTS } from '@common/config/asserts.config';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.DOCUMENT_MAX_LENGTH,
    unique: true
  })
  document: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.FIRSTNAME_MAX_LENGTH
  })
  firstname: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.LASTNAME_MAX_LENGTH
  })
  lastname: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.EMAIL_MAX_LENGTH,
    unique: true
  })
  email: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.USERNAME_MAX_LENGTH,
    unique: true
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255
  })
  password: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.PHONE_MAX_LENGTH,
    unique: true
  })
  phone: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.ADDRESS_MAX_LENGTH,
    nullable: true
  })
  address: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.LOCATION_LAT_LNG_MAX_LENGTH,
    nullable: true
  })
  locationLatLng: string;

  @Column({
    type: 'varchar',
    length: ASSERTS.USER.AVATAR_MAX_LENGTH,
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
    joinColumns: [{ name: 'userId' }],
    inverseJoinColumns: [{ name: 'roleId' }]
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

  @BeforeInsert()
  usernameEqualsToEmail() {
    this.username = this.email.toLowerCase();
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password);
  }
}
