import { EntityRepository, Repository } from 'typeorm'
import { PageThatFollowEntity } from '../../entity/page-that-follow.entity'

@EntityRepository(PageThatFollowEntity)
export class PageFollowRepository extends Repository<PageThatFollowEntity> {}
