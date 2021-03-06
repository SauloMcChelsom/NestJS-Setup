import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn
} from 'typeorm';
import { PublicationEntity as Publication } from './publication.entity';
import { UserEntity as User } from './user.entity';

@Entity('like')
export class LikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  i_liked: boolean;

  @ManyToOne((type) => Publication)
  @JoinColumn({ name: 'publication_id' })
  @Column()
  publication_id: number;

  @ManyToOne((type) => User)
  @JoinColumn({ name: 'user_id' })
  @Column()
  user_id: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
