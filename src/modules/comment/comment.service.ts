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

  public async makeComment(comment:CommentDto, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    comment.user_id = user.id
    await this.model.saveComment(comment)

    let res = await this.model.getComment(comment.publication_id.toString(), user.id.toString())
    return new OK([res], code.SUCCESSFULLY_FOUND, message.SUCCESSFULLY_FOUND) 
  }

  public async updateComment(comment:UpdateDto, id:string, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    await this.model.updateComment(id, comment)

    let res = await this.model.findOneById(id)

    return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
  }
  

}

