import { Injectable } from '@nestjs/common'

import { ClassificationInterface } from '@root/src/lib/interfaces'

import { PublicationModel } from './publication.model'
import { CreateInterface, UpdateInterface } from './interface'

@Injectable()
export class PublicationService {

  constructor(
    private model:PublicationModel
  ) {}

  public async create(body:CreateInterface) {
    body.number_of_likes = 0
    return  await this.model.create(body)
  }

  public async update(body:UpdateInterface) {
    await this.model.update(body.id, body);
    return await this.model.findOneById(body.id)
  }

  public async authFindOneById(id:number) {
    return await this.model.findOneById(id)
  }

  public async publicfindOneById(id:number) {
    return await this.model.findOneById(id)
  }

  public async authListFeed(cls:ClassificationInterface) {
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
    return  await this.model.listFeed(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
  }

  public async publicListFeed(cls:ClassificationInterface) {
    return  await this.model.listFeed(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
  }

  public async authListSearchByText(cls:ClassificationInterface) {
    this.model.validateSearchByText(cls.search)
    return  await this.model.searchByText(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
  }

  public async publicListSearchByText(cls:ClassificationInterface) {
    this.model.validateSearchByText(cls.search)
    return await this.model.searchByText(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
  }

  public async incrementNumberLikeOfPublication(id:any) {
    await this.model.incrementLikes(id)
  }

  public async decrementNumberLikeOfPublication(id:any) { 
    await this.model.decrementLikes(id)
  }

  public async incrementNumberCommentOfPublication(id:any) {
    await this.model.incrementComment(id)
  }

  public async decrementNumberCommentfPublication(id:any) { 
    await this.model.decrementComment(id)
  }
  
}

