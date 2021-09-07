import { EntityRepository, Repository } from 'typeorm'
import { PaginaEntity } from '../../entity/pagina.entity'

@EntityRepository(PaginaEntity)
export class IndexRepository extends Repository<PaginaEntity> {}
