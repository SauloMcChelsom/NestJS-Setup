import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PublicacaoEntity as Publicacao } from './publicacao.entity'
import { UsuarioEntity as Usuario } from './usuario.entity'

@Entity('minhas_curtidas')
export class MinhasCurtidasEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eu_curti: boolean

  @ManyToOne(type => Publicacao)  
  @JoinColumn({name: "publicacao_id"})  
  @Column() 
  publicacao_id: number;

  @ManyToOne(type => Usuario) 
  @JoinColumn({name: "usuario_id"})   
  @Column()
  usuario_id: number;
}