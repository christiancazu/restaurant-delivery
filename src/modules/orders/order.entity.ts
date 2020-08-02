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
  BeforeInsert,
  ManyToMany,
  OneToMany
} from 'typeorm';
import { User } from '../users/user.entity';
import { Status } from '../status/status.entity';
import { Rating } from '../ratings/rating.entity';
import { Vehicle } from '../vehicles/vehicle.entity';
import { Payment } from 'src/modules/payments/payment.entity';
import { ASSERTS } from '@common/config/asserts.config';

@Entity('orders')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: ASSERTS.ORDER.DESTINE_LAT_LNG
    })
    destineLatLng: string;

    @ManyToOne(() => Payment)
    @JoinColumn({ name: 'paymentId' })
    payment: Payment;

    @ManyToOne(() => Status)
    @JoinColumn({ name: 'statusId' })
    status: Status;

    @ManyToOne(() => Rating)
    @JoinColumn({ name: 'ratingId' })
    rating: Rating;

    @Column({
      type: 'varchar',
      length: ASSERTS.ORDER.RATING_DESCRIPTION,
      nullable: true
    })
    ratingDescription: string

    @ManyToOne(() => User)
    @JoinColumn({ name: 'requestedByUserId' })
    client: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'deliveredByUserId' })
    dealer: User;

    @ManyToOne(() => Vehicle)
    @JoinColumn({ name: 'deliveredByVehicleId' })
    vehicle: Vehicle;

    @Column({
      type: 'varchar',
      length: ASSERTS.ORDER.PAYMENT_CODE,
      nullable: true
    })
    paymentCode: string

    @Column({
      type: 'decimal',
      precision: 5,
      scale: 2,
      nullable: true
    })
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
      this.status = new Status(1); // 1 = RECEIVED STATUS ID
    }

    constructor(id: number) {
      super();
      this.id = id;
    }
}
