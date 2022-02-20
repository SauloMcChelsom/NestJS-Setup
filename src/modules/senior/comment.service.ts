import { Injectable } from '@nestjs/common'

import { ClassificationInterface } from '@root/src/lib/interfaces'
import { PublicationService } from '@modules/publication/publication.service'

import { CommentModel } from './comment.model'
import { CreateInterface, UpdateInterface } from './interface'

@Injectable()
export class CommentService {

  constructor(
    private model: CommentModel, 
    private publication:PublicationService
  ) {}

  public async authListByUserId(id:number, cls:ClassificationInterface){
    return await this.model.listByUserId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end) 
  }

  public async publicListByUserId(id:number, cls:ClassificationInterface){
    return await this.model.listByUserId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
  }

  public async publicListByPublicationId(id:number, cls:ClassificationInterface){
    return await this.model.listByPublicationId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
  }

  public async authFindOneById(id:number, userId:number){
    await this.model.validateID(id, userId)
   return await this.model.findOneById(id)
  }

  public async publicFindOneById(id:number){
    return await this.model.findOneById(id)
  }

  public async create(body:CreateInterface) {
    let create = await this.model.create(body)
    return await this.model.findOneById(create.id)
  }

  public async update(body:UpdateInterface) {
    await this.model.validateID(body.id, body.user_id)
    await this.model.updateById(body.id, body)
    return await this.model.findOneById(body.id)
  }

  public async delete(id:number, userId:number){
    await this.model.validateID(id, userId)
    let comment = await this.model.findOneById(id)
    await this.model.deleteById(id);
    await this.publication.decrementNumberCommentfPublication(comment.publication_id)
  }

}