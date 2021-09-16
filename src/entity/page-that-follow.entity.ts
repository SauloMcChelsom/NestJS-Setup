import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { UserEntity as User } from './user.entity'
import { PageEntity as Page } from './page.entity'

@Entity('page_that_follow')
export class PageThatFollowEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  i_am_following: boolean;

  @ManyToOne(type => Page)
  @JoinColumn({name: "page_id"})
  @Column()
  page_id: number;

  @ManyToOne(type => User) 
  @JoinColumn({name: "user_id"}) 
  @Column()
  user_id: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;
}
