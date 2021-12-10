import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { PageModel } from '@modules/page/page.model'
import { PublicationModel } from '@modules/publication/publication.model'

import { CommentRepository } from './comment.repository'
import { CommentModel } from './comment.model'
import { CommentDto } from './dto/comment.dto'
import { UpdateDto } from './dto/update.dto'

@Injectable()
export class CommentService {

  constructor(
    @InjectRepository(CommentRepository) private readonly repository: CommentRepository,
    private modelFirebase:FirebaseModel,
    private modelUser:UserModel,
    private modelPage:PageModel,
    private modelPublication:PublicationModel,
    private model:CommentModel
  ) {}

  public async findOneById(id:string, token:string){
    let body = await this.modelFirebase.isToken(token)
    await this.modelFirebase.validateTokenByFirebase(body)
    let res = await this.model.findOneById(id)
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async findByUserId(id:string, token:string){
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    await this.modelUser.getUserByUid(decoded.uid)

    let res = await this.model.findByUserId(id)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async findByPublicationId(id:string, token:string){
    let body = await this.modelFirebase.isToken(token)
    await this.modelFirebase.validateTokenByFirebase(body)

    let res = await this.model.findByPublicationId(id)
    return new OK(res, code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async createComment(comment:CommentDto, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    comment.user_id = user.id
    let create = await this.model.create(comment)
    let res = await this.model.findOneById(create.id)
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async updateComment(comment:UpdateDto, id:string, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    await this.model.updateById(id, comment)

    let res = await this.model.findOneById(id)

    return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }

  public async deleteComment(id:string, token:string){
    let body = await this.modelFirebase.isToken(token)
    await this.modelFirebase.validateTokenByFirebase(body)

    await this.model.deleteById(id);

    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

}

