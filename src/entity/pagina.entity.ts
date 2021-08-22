import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { UsuarioEntity as Usuario } from './usuario.entity'

@Entity('pagina')
export class PaginaEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  descricao_da_pagina: string;

  @Column()
  nome_da_pagina: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  data_criacao_pagina: Date;

  @OneToOne(type => Usuario) 
  @JoinColumn({name: "usuario_id"}) 
  @Column()
  usuario_id: number;
}