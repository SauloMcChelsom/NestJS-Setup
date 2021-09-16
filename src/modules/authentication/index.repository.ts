import { EntityRepository, Repository } from 'typeorm'
import { PageEntity } from '../../entity/page.entity'

@EntityRepository(PageEntity)
export class IndexRepository extends Repository<PageEntity> {}
