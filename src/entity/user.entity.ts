import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column()
  sobreNome: string;

  @Column()
  email: string;

  @Column()
  tipo: number;

  @Column()
  ativo: boolean;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  lastChangedDateTime: Date;
   
  @Column()
  cpfCnpj: string;

  @Column()
  rating: number;
}