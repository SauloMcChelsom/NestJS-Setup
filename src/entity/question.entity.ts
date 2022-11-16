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
  
@Entity({ schema: 'quiz', name: 'question'})
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ fulltext: true })
  @Column('text')
  question_name: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne((type) => TitleEntity)
  @JoinColumn({ name: 'title_id' })
  @Column()
  title_id: number;
}