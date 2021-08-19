import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PublicacaoEntity as Publicacao } from './publicacao.entity'

@Entity('curtidas')
export class CurtidasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade_de_curtidas: number;

  @OneToOne(type => Publicacao) 
  @JoinColumn({name: "publicacao_id"})  
  publicacao_id: number;
}