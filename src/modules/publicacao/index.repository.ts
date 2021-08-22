import { EntityRepository, Repository } from 'typeorm';
import { PublicacaoEntity } from '../../entity/publicacao.entity';

@EntityRepository(PublicacaoEntity)
export class IndexRepository extends Repository<PublicacaoEntity> {
    async feedPublic(): Promise<PublicacaoEntity> {
        return await this.createQueryBuilder('publicacao')
        .leftJoinAndSelect('publicacao.pagina_id', 'publicacao')
        .where(`pagina.id = publicacao.pagina_id`)
        .execute()
      }
}

/**
 * 		select * from publicacao 
		JOIN pagina pag ON
			publicacao.pagina_id = pag.id
 */
