import {
    Entity,
    Column,
    Index,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { QuestionEntity } from './question.entity';
  
@Entity({ schema: 'quiz', name: 'response'})
export class ResponseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column('text')
  response_name: string;

  @Column('boolean')
  correct: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne((type) => QuestionEntity)
  @JoinColumn({ name: 'question_id' })
  @Column()
  question_id: number;
}