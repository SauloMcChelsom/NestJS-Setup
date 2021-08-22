import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PublicacaoEntity as Publicacao } from './publicacao.entity'
import { UsuarioEntity as Usuario } from './usuario.entity'

@Entity('minhas_curtidas')
export class MinhasCurtidasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eu_curti: boolean

  @OneToOne(type => Publicacao) 
  @JoinColumn({name: "publicacao_id"})   
  publicacao_id: number;

  @OneToOne(type => Usuario) 
  @JoinColumn({name: "usuario_id"})   
  @Column()
  usuario_id: number;
}