import { EntityRepository, Repository } from 'typeorm';
import { LikeEntity } from '@root/src/entity/like.entity';

@EntityRepository(LikeEntity)
export class LikeEntityRepository extends Repository<LikeEntity> {}
