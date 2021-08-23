import { EntityRepository, Repository } from 'typeorm';
import { PublicacaoEntity } from '../../entity/publicacao.entity';

@EntityRepository(PublicacaoEntity)
export class IndexRepository extends Repository<PublicacaoEntity> {
  async feedPublic(): Promise<any[]> {
    return await this.createQueryBuilder('publicacao')
    .leftJoinAndSelect("pagina", "pagina.id = publicacao.pagina_id")
    .getMany();
  }
}

/**
  select
    pagina.nome_da_pagina,
    publicacao.texto,
    publicacao.data_da_publicacao 
  from
    publicacao
  join pagina on
    publicacao.pagina_id = pagina.id
 */
