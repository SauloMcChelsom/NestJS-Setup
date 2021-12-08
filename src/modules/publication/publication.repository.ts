import { EntityRepository, Repository } from 'typeorm'
import { PublicationEntity } from '@root/src/entity/publication.entity'

@EntityRepository(PublicationEntity)
export class PublicationRepository extends Repository<PublicationEntity> {

  async feed(): Promise<any[]> {
    return await this.createQueryBuilder('publicacao')
    .leftJoinAndSelect("pagina", "pagina", "pagina.id = publicacao.pagina_id")
    .leftJoinAndSelect("usuario", "usuario", "usuario.id = pagina.usuario_id")
    .getRawMany();
  }
  
}