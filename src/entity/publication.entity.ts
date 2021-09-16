import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PageEntity as page } from './page.entity'

@Entity('publication')
export class PublicationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  number_of_likes: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  timestamp: Date;

  @ManyToOne(type => page) 
  @JoinColumn({name: "page_id"}) 
  @Column()
  page_id: number;
}