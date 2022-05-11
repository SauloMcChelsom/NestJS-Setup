import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { UserSeniorEntity } from './user.senior.entity'

@Entity('check_in_senior')
export class CheckInSeniorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  add_car: boolean;

  @Column()
  dateIn: Date;

  @Column()
  dateOut: Date;

  @Column()
  price: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(type => UserSeniorEntity) 
  @JoinColumn({name: "senior_id"}) 
  @Column()
  senior_id: number;
}