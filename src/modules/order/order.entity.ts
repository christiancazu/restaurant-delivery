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
} from 'typeorm';
import { User } from '../users/user.entity';
import { Status } from '../status/status.entity';
import { Rating } from '../rating/rating.entity';
import { Vehicle } from '../vehicle/vehicle.entity';

@Entity('order')
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({
      type: 'varchar',
      length: 128,
      nullable: false,
    })
    destineLatLng: string;

    @ManyToOne(() => Status,{ nullable: false, })
    @JoinColumn({ name: 'status_id', })
    status: Status;

    @ManyToOne(() => Rating,{ nullable: false, })
    @JoinColumn({ name: 'rating_id', })
    rating: Rating;

    @Column({
      type: 'varchar',
      length: 128,
      nullable: true,
    })
    rating_description: string

    @OneToOne(() => User,{ nullable: false, })
    @JoinColumn({ name: 'requested_by_user_id', })
    requested_user: User;

    @OneToOne(() => User,{ nullable: false, })
    @JoinColumn({ name: 'delivered_by_user_id', })
    delivered_user: User;

    @ManyToOne(() => Vehicle,{ nullable: false, })
    @JoinColumn({ name: 'delivered_by_vehicle_id', })
    vehicle: Vehicle;

    @Column({
      type: 'varchar',
      length: 16,
      nullable: true,
    })
    payment_card: string

    @Column({
      type: 'decimal',
      nullable: false,
    })
    total: number

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

    @UpdateDateColumn()
    @Column({
      type: 'boolean',
      nullable: false,
    })
    played: boolean;

    @BeforeInsert()
    beforeInsertActions() {
      this.played = false;
    }
}
