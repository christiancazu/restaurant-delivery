import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  BeforeInsert
} from 'typeorm';
import { User } from '../users/user.entity';
import { Status } from '../status/status.entity';
import { Rating } from '../ratings/rating.entity';
import { Vehicle } from '../vehicles/vehicle.entity';

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: 128
    })
    destineLatLng: string;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'statusId' })
    status: Status;

    @ManyToOne(() => Rating)
    @JoinColumn({ name: 'ratingId' })
    rating: Rating;

    @Column({
      type: 'varchar',
      length: 128,
      nullable: true
    })
    ratingDescription: string

    @OneToOne(() => User)
    @JoinColumn({ name: 'requestedByUserId' })
    client: User;

    @OneToOne(() => User)
    @JoinColumn({ name: 'deliveredByUserId' })
    dealer: User;

    @OneToOne(() => Vehicle)
    @JoinColumn({ name: 'deliveredByVehicleId' })
    vehicle: Vehicle;

    @Column({
      type: 'varchar',
      length: 32,
      nullable: true
    })
    paymentCode: string

    @Column({ type: 'decimal' })
    total: number

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @Column({ type: 'boolean' })
    payed: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.payed = false;
    }
}
