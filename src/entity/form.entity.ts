import {
    Entity,
    Column,
    Index,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { TitleEntity } from './title.entity';
  
@Entity({ schema: 'quiz', name: 'form'})
export class FormEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  is_marked: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @Column()
  question_id: number;

  @Column()
  creator_id: number;

  @Column()
  follower_id: number;

  @Column()
  marked_response_id: number;
}