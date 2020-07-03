import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert
} from 'typeorm';

@Entity('vehicles')
export class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      unique: true,
      length: 8
    })
    licence_plate: string;

    @Column({
      type: 'varchar',
      length: 16
    })
    type: string;

    @Column({ type: 'int' })
    capability: boolean;

    @Column({ type: 'boolean' })
    available: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.available = true;
    }
}

