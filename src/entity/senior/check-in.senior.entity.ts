import { Entity, Column, Index, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { UserSeniorEntity } from './user.senior.entity'

@Entity('check_in_senior')
export class CheckInSeniorEntity {
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

  @ManyToOne(type => UserSeniorEntity) 
  @JoinColumn({name: "senior_id"}) 
  @Column()
  senior_id: number;
}