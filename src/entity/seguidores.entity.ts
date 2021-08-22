import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PaginaEntity as Pagina } from './pagina.entity'

@Entity('seguidores')
export class SeguidoresEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantidade_de_seguidores: number

  @OneToOne(type => Pagina) 
  @JoinColumn({name: "pagina_id"}) 
  @Column()
  pagina_id: number;
}