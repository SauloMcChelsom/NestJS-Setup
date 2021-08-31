import { EntityRepository, Repository } from 'typeorm'
import { PaginaEntity } from '../../entity/pagina.entity'

@EntityRepository(PaginaEntity)
export class PaginasRepository extends Repository<PaginaEntity> {}
