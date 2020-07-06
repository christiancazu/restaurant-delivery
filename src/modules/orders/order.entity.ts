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
    @JoinColumn({ name: 'status_id' })
    status: Status;

    @ManyToOne(() => Rating)
    @JoinColumn({ name: 'rating_id' })
    rating: Rating;

    @Column({
      type: 'varchar',
      length: 128,
      nullable: true
    })
    rating_description: string

    @OneToOne(() => User)
    @JoinColumn({ name: 'requested_by_user_id' })
    requested_user: User;

    @OneToOne(() => User)
    @JoinColumn({ name: 'delivered_by_user_id' })
    delivered_user: User;

    @ManyToOne(() => Vehicle)
    @JoinColumn({ name: 'delivered_by_vehicle_id' })
    vehicle: Vehicle;

    @Column({
      type: 'varchar',
      length: 16,
      nullable: true
    })
    payment_card: string

    @Column({ type: 'decimal' })
    total: number

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updated_at: Date;

    @Column({ type: 'boolean' })
    payed: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.payed = false;
    }
}
