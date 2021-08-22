import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { UsuarioEntity as Usuario } from './usuario.entity'
import { PaginaEntity as Pagina } from './pagina.entity'

@Entity('paginas_que_sigo')
export class PaginasQueSigoEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  estou_seguindo: boolean;

  @OneToOne(type => Pagina) 
  @JoinColumn({name: "pagina_id"})
  @Column()
  pagina_id: number;

  @OneToOne(type => Usuario) 
  @JoinColumn({name: "usuario_id"}) 
  @Column()
  usuario_id: number;
}
