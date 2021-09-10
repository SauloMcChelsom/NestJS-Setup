import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from 'typeorm';

@Entity('usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uid: string;

  @Column({ unique: true })
  email: string;

  @Column()
  nome: string;

  @Column()
  senha: string;

  @Column()
  providers: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  data_de_cadastro: Date;
}