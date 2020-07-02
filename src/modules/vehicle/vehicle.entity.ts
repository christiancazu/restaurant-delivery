import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
} from 'typeorm';

@Entity('vehicle')
export class Vehicle extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      unique: true,
      length: 8,
      nullable: false,
    })
    licence_plate: string;

    @Column({
      type: 'varchar',
      length: 16,
      nullable: false,
    })
    type: string;

    @Column({
      type: 'boolean',
      nullable: false,
    })
    enabled: boolean;

    @Column({
      type: 'int',
      nullable: false,
    })
    capability: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.enabled = true;
    }
}

