import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity('senior')
export class SeniorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  documents: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}