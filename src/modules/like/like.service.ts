import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { UserModel } from '@modules/user/user.model'
import { PageModel } from '@modules/page/page.model'
import { PublicationModel } from '@modules/publication/publication.model'

import { LikeRepository } from './like.repository'
import { LikeModel } from './like.model'
import { LikeDto } from './dto/like.dto'

@Injectable()
export class LikeService {

  constructor(
    @InjectRepository(LikeRepository) private readonly repository: LikeRepository,
    private modelFirebase:FirebaseModel,
    private modelUser:UserModel,
    private modelPage:PageModel,
    private modelPublication:PublicationModel,
    private model:LikeModel
  ) {}

  public async likePublication(like:LikeDto, token:string) {
    let body = await this.modelFirebase.isToken(token)
    const decoded = await this.modelFirebase.validateTokenByFirebase(body)
    const user = await this.modelUser.getUserByUid(decoded.uid)

    like.user_id = user.id

    //verificar se o usuario ja curtiu a publicacao
    let amLiking = await this.model.userAlreadyLikePublication(like.publication_id.toString(), user.id.toString())
    
    if(amLiking){
      //se houver registro,  verifica se esta curtindo
      let segments = await this.model.getLike(like.publication_id.toString(), user.id.toString())
   
      if(segments.i_liked){
        //se sim, atualiza para 'para de curtir' e atualizar o contator na tabela publication para --
        await this.model.updateLike(segments.id.toString(), {i_liked:false})
        await this.modelPublication.decrementNumberLikeOfPublication(segments.publication_id)

        let res = await this.model.getLike(like.publication_id.toString(), user.id.toString())
        return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }else{
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.model.updateLike(segments.id.toString(), {i_liked:true})
        await this.modelPublication.incrementNumberLikeOfPublication(segments.publication_id)

        let res = await this.model.getLike(like.publication_id.toString(), user.id.toString())
        return new OK([res], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }
    }else{
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      like.i_liked = true
      await this.repository.save(like)
      await this.modelPublication.incrementNumberLikeOfPublication(like.publication_id.toString())
      let res = await this.model.getLike(like.publication_id.toString(), user.id.toString())
      return new OK([res], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
    }
  }

}

