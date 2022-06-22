import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { PageEntity as page } from './page.entity';
import { UserEntity as User } from './user.entity';

@Entity('publication')
export class PublicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  number_of_likes: number;

  @Column()
  number_of_comments: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne((type) => page)
  @JoinColumn({ name: 'page_id' })
  @Column()
  page_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;
}
