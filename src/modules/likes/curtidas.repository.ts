import { EntityRepository, Repository } from 'typeorm'
import { MinhasCurtidasEntity } from '../../entity/my-likes.entity'

@EntityRepository(MinhasCurtidasEntity)
export class CurtidasRepository extends Repository<MinhasCurtidasEntity> {}
