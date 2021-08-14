import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('cliente')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  codcli: number;

  @Column()
  nome: string;

  @Column()
  cnh: string;

  @Column()
  cidade: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  registro: Date;
}