import { EntityRepository, Repository } from 'typeorm'
import { PageEntity } from '../../entity/page.entity'

@EntityRepository(PageEntity)
export class PageRepository extends Repository<PageEntity> {}
