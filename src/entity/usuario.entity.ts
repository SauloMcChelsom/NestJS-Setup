import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  data_de_cadastro: Date;
}