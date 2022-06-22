import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity as User } from './user.entity';

@Entity('page')
export class PageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  page_description: string;

  @Column()
  page_name: string;

  @Column()
  number_of_followers: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;
}
