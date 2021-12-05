import { EntityRepository, Repository } from 'typeorm'
import { PageSegmentsEntity } from '../../entity/page-segments.entity'

@EntityRepository(PageSegmentsEntity)
export class PageSegmentsRepository extends Repository<PageSegmentsEntity> {}
