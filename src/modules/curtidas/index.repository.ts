import { EntityRepository, Repository } from 'typeorm';
import { CurtidasEntity } from '../../entity/curtidas.entity';

@EntityRepository(CurtidasEntity)
export class IndexRepository extends Repository<CurtidasEntity> {}
