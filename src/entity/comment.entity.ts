import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PublicationEntity as Publication } from './publication.entity'
import { UserEntity as User } from './user.entity'

@Entity('comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(type => Publication) 
  @JoinColumn({name: "publication_id"}) 
  @Column()
  publication_id: number;

  @ManyToOne(type => User) 
  @JoinColumn({name: "user_id"}) 
  @Column()
  user_id: number;
}