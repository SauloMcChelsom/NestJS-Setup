import { Injectable } from '@nestjs/common';

import { ListFilter } from '@root/src/shared/interfaces/classification.interface';
import { CreatePublication, UpdatePublication } from '@shared/interfaces/publication.interface';
import { PublicationEntityModel } from '@model/publication-entity/publication-entity.model';

@Injectable()
export class PublicationService {
  constructor(private publication: PublicationEntityModel) {}

  public async create(body: CreatePublication) {
    return await this.publication.create(body);
  }

  public async update(body: UpdatePublication) {
    await this.publication.updateById(body.id, body);
    return await this.publication.findOneById(body.id);
  }

  public async authFindOneById(id: number) {
    return await this.publication.findOneById(id);
  }

  public async publicfindOneById(id: number) {
    return await this.publication.findOneById(id);
  }

  public async listPublicationByPage(id: number, cls: ListFilter) {
    return await this.publication.listPublicationByPage(
      id,
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async feed(id: number, cls: ListFilter) {
    /**
     * buscar da tabela
     *    pagina
     *    publicação
     *
     * rotina:
     *   - das paginas que sigo trazer as atuais para as antigas
     *   - as mais curtidas
     *   - as paginas com mais seguidores
     *   - as mais commentadas
     *
     *   - das que não sigo, mais esta em alta
     *   - as mais curtidas
     *   - as paginas com mais seguidores
     *   - as mais commentadas
     *
     * ordenação:
     *   0 - 5
     *
     */
    return await this.publication.listFeed(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async publicFeed(cls: ListFilter) {
    /**
     * buscar da tabela
     *    pagina
     *    publicação
     *
     * rotina:
     *   - das paginas que sigo trazer as atuais para as antigas
     *   - as mais curtidas
     *   - as paginas com mais seguidores
     *   - as mais commentadas
     *
     *   - das que não sigo, mais esta em alta
     *   - as mais curtidas
     *   - as paginas com mais seguidores
     *   - as mais commentadas
     *
     * ordenação:
     *   0 - 5
     *
     */
    return await this.publication.listFeed(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async authListSearchByText(cls: ListFilter) {
    return await this.publication.searchByText(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async publicListSearchByText(cls: ListFilter) {
    return await this.publication.searchByText(
      cls.search,
      cls.limit,
      cls.offset,
      cls.order,
      cls.column,
      cls.start,
      cls.end,
    );
  }

  public async incrementNumberLikeOfPublication(id: any) {
    await this.publication.incrementLikes(id);
  }

  public async decrementNumberLikeOfPublication(id: any) {
    await this.publication.decrementLikes(id);
  }

  public async incrementNumberCommentOfPublication(id: any) {
    await this.publication.incrementComment(id);
  }

  public async decrementNumberCommentfPublication(id: any) {
    await this.publication.decrementComment(id);
  }
}
