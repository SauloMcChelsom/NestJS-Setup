import {
  Entity,
  Column,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity as User } from './user.entity';
  
@Entity({ schema: 'quiz', name: 'title'})
export class TitleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column('text')
  title_name: string;

  @Index({ fulltext: true })
  @Column('text')
  level: string

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;
}
  