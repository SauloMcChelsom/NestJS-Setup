import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity('user_senior')
export class UserSeniorEntity {
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