import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('cliente')
export class ClienteEntity {
  @PrimaryGeneratedColumn()
  codcar: number;

  @Column()
  placa: string;

  @Column()
  cor: string;

  @Column()
  modelo: string;

  @Column()
  ano: number;

  @Column()
  diaria: number;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  registro: Date;
}