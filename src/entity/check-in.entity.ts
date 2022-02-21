import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { SeniorEntity as User } from './senior.entity'

@Entity('check_in')
export class CheckInEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adicional_veiculo: boolean;

  @Column()
  dataEntrada: Date;

  @Column()
  dataSaida: Date;

  @Column()
  valor: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(type => User) 
  @JoinColumn({name: "senior_id"}) 
  @Column()
  senior_id: number;
}