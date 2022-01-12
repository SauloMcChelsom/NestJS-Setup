import { Injectable } from '@nestjs/common'

import { ClassificationInterface } from '@shared/interfaces'
import { OK } from '@service/exception'
import { code, message } from '@shared/enum'

import { PublicationModel } from './publication.model'
import { CreateInterface, UpdateInterface } from './interface'
import { 
  CreateMapper, 
  AuthListMapper, 
  PublicListMapper,
  AuthFindOneMapper,
  PublicFindOneMapper
} from './mapper'

@Injectable()
export class PublicationService {

  constructor(
    private createMapper:CreateMapper, 
    private authListMapper:AuthListMapper, 
    private publicListMapper:PublicListMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper,
    private model:PublicationModel
  ) {}

  public async create(body:CreateInterface) {
    body.number_of_likes = 0
    const res = await this.model.create(body)
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
  }

  public async update(body:UpdateInterface) {
    await this.model.update(body.id, body);
    const res = await this.model.findOneById(body.id)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  /**
   * 
   * @param REFATORAR
   * @returns 
   */
  public async authFindOneById(id:any) {
    return await this.model.findOneById(id)
  }

  public async publicfindOneById(id:any) {
    const res = await this.model.findOneById(id)
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
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
    const res =  await this.model.listFeed(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicListFeed(cls:ClassificationInterface) {
     const res =  await this.model.listFeed(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
     const dto = res.map((r)=> this.publicListMapper.toMapper(r))
     return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authListSearchByText(cls:ClassificationInterface) {
    this.model.validateSearchByText(cls.search)
    const res =  await this.model.searchByText(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
    const dto = res.map((r)=> this.authListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicListSearchByText(cls:ClassificationInterface) {
    this.model.validateSearchByText(cls.search)
    const res = await this.model.searchByText(cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end);
    const dto = res.map((r)=> this.publicListMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
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

