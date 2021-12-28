import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { PageModel } from '@modules/page/page.model'
import { PublicationModel } from '@modules/publication/publication.model'

import { CommentModel } from './comment.model'
import { CreateDto } from './dto/create.dto'
import { UpdateDto } from './dto/update.dto'

@Injectable()
export class CommentService {

  constructor(
    private model:CommentModel
  ) {}

  public async authFindByUserToken(id:string){
    let  res  = await this.model.findByUserId(id)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authFindByUserId(id:string){
    let  res  = await this.model.findByUserId(id)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicFindByUserId(id:string, search?:string, limit?:number, offset?:number, order?:string, column?:string, start?:string, end?:string){
    const  res = await this.model.findByUserId(id, search, limit, offset, order, column, start, end)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async findByPublicationId(id:string){
    let res = await this.model.findByPublicationId(id)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async authFindOneById(id:string, userId:string){
    await this.model.validateID(id, userId)
    let res = await this.model.findOneById(id)
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async publicFindOneById(id:string){
    let res = await this.model.findOneById(id)
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async createComment(comment:CreateDto) {
    let create = await this.model.create(comment)
    let res = await this.model.findOneById(create.id)
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async updateComment(comment:UpdateDto, id:string, userId:string) {
    await this.model.validateID(id, userId)
    await this.model.updateById(id, comment)
    let res = await this.model.findOneById(id)
    return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  public async deleteComment(id:string, userId:string){
    await this.model.validateID(id, userId)
    await this.model.deleteById(id);
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

}

