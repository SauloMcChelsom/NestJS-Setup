import { EntityRepository, Repository } from 'typeorm'
import { PageEntity } from '../../entity/page.entity'

@EntityRepository(PageEntity)
export class PaginasRepository extends Repository<PageEntity> {}
