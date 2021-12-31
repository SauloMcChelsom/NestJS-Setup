import { Injectable } from '@nestjs/common'

import { OK } from '@service/exception'
import { code, message } from '@shared/enum'

import { CommentModel } from './comment.model'
import { CreateInterface, UpdateInterface, ClassificationInterface } from './interface'
import { 
  CreateCommentMapper, 
  AuthListCommentByUserIdMapper, 
  PublicListCommentByUserIdMapper,
  AuthFindOneCommentByIdMapper,
  PublicListCommentByPublicationIdMapper,
  UpdateCommentMapper,
  PublicFindOneCommentByIdMapper
} from './mapper'

@Injectable()
export class CommentService {

  constructor(
    private model: CommentModel, 
    private createCommentMapper: CreateCommentMapper,
    private authListCommentByUserIdMapper: AuthListCommentByUserIdMapper,
    private publicListCommentByUserIdMapper: PublicListCommentByUserIdMapper,
    private authFindOneCommentByIdMapper: AuthFindOneCommentByIdMapper,
    private publicListCommentByPublicationIdMapper: PublicListCommentByPublicationIdMapper,
    private updateCommentMapper: UpdateCommentMapper,
    private publicFindOneCommentByIdMapper: PublicFindOneCommentByIdMapper
  ) {}

  public async authListCommentByUserId(id:string, cls:ClassificationInterface){
    let  res  = await this.model.listByUserId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.authListCommentByUserIdMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicListCommentByUserId(id:string, cls:ClassificationInterface){
    const  res = await this.model.listByUserId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.publicListCommentByUserIdMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicListCommentByPublicationId(id:string, cls:ClassificationInterface){
    let res = await this.model.listByPublicationId(id, cls.search, cls.limit, cls.offset, cls.order, cls.column, cls.start, cls.end)
    const dto = res.map((r)=> this.publicListCommentByPublicationIdMapper.toMapper(r))
    return new OK(dto, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authFindOneCommentById(id:string, userId:string){
    await this.model.validateID(id, userId)
    let res = await this.model.findOneById(id)
    const dto = this.authFindOneCommentByIdMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicFindOneCommentById(id:string){
    let res = await this.model.findOneById(id)
    const dto = this.publicFindOneCommentByIdMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async createComment(comment:CreateInterface) {
    let create = await this.model.create(comment)
    let res = await this.model.findOneById(create.id)
    const dto = this.createCommentMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async updateComment(comment:UpdateInterface) {
    await this.model.validateID(comment.id.toString(), comment.user_id.toString())
    await this.model.updateById(comment.id, comment)
    let res = await this.model.findOneById(comment.id.toString())
    const dto = this.updateCommentMapper.toMapper(res)
    return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  public async deleteComment(id:string, userId:string){
    await this.model.validateID(id, userId)
    await this.model.deleteById(id);
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

}

