import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne, ManyToOne, JoinColumn, UpdateDateColumn, } from 'typeorm';
import { PaginaEntity as Pagina } from './pagina.entity'

@Entity('publicacao')
export class PublicacaoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  texto: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
  data_da_publicacao: Date;

  @ManyToOne(type => Pagina) 
  @JoinColumn({name: "pagina_id"}) 
  @Column()
  pagina_id: number;

  /**
    @JoinTable({
      name: "products_categories",
      joinColumn: {
        name: "product",
        referencedColumnName: "id"
      },
      inverseJoinColumn: {
        name: "category",
        referencedColumnName: "id"
      }
    })
  */
}