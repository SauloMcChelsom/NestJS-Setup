import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PublicacaoEntity as Publicacao } from './publicacao.entity'
import { UsuarioEntity as Usuario } from './usuario.entity'

@Entity('comentario')
export class ComentarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comentario_do_usuario: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  data_do_comentario: Date;

  @OneToOne(type => Publicacao) 
  @JoinColumn({name: "publicacao_id"}) 
  @Column()
  publicacao_id: number;

  @OneToOne(type => Usuario) 
  @JoinColumn({name: "usuario_id"}) 
  @Column()
  usuario_id: number;
}