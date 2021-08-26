import { EntityRepository, Repository } from 'typeorm';
import { MinhasCurtidasEntity } from '../../entity/minhas-curtidas.entity';

@EntityRepository(MinhasCurtidasEntity)
export class IndexRepository extends Repository<MinhasCurtidasEntity> {}
