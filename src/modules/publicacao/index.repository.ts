import { EntityRepository, Repository } from 'typeorm';
import { PublicacaoEntity } from '../../entity/publicacao.entity';

@EntityRepository(PublicacaoEntity)
export class IndexRepository extends Repository<PublicacaoEntity> {}
