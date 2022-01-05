import { Injectable } from '@nestjs/common'

import { OK } from '@service/exception'
import { code, message } from '@shared/enum'
import { PublicationModel } from '@modules/publication/publication.model'

import { LikeModel } from './like.model'
import { CreateInterface } from './interface/create.interface'
import { CreateLikeMapper } from './mapper/createLike.mapper'

@Injectable()
export class LikeService {

  constructor(
    private modelPublication:PublicationModel,
    private model:LikeModel,
    private createLikeMapper:CreateLikeMapper
  ) {}

  public async createLike(like:CreateInterface) {
    //verificar se o usuario ja curtiu a publicacao
    let amLiking = await this.model.userAlreadyLikePublication(like.publication_id.toString(), like.user_id.toString())
    
    if(amLiking){
      //se houver registro,  verifica se esta curtindo
      let segments = await this.model.getLike(like.publication_id.toString(), like.user_id.toString())
   
      if(segments.i_liked){
        //se sim, atualiza para 'para de curtir' e atualizar o contator na tabela publication para --
        await this.model.updateLike(segments.id.toString(), {i_liked:false})
        await this.modelPublication.decrementNumberLikeOfPublication(segments.publication_id)

        let res = await this.model.getLike(like.publication_id.toString(), like.user_id.toString())
        const dto = this.createLikeMapper.toMapper(res)
        return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }else{
        //se não, atualizar para 'começar a seguir' e atualizar o contator na tabela page ++
        await this.model.updateLike(segments.id.toString(), {i_liked:true})
        await this.modelPublication.incrementNumberLikeOfPublication(segments.publication_id)

        let res = await this.model.getLike(like.publication_id.toString(), like.user_id.toString())
        const dto = this.createLikeMapper.toMapper(res)
        return new OK([dto], code.SUCCESSFULLY_UPDATED, message.SUCCESSFULLY_UPDATED) 
      }
    }else{
      //se não houver registro, criar um registro ja seguindo e atualizar o contator na tabela page ++
      like.i_liked = true
      await this.model.save(like)
      await this.modelPublication.incrementNumberLikeOfPublication(like.publication_id.toString())
      let res = await this.model.getLike(like.publication_id.toString(), like.user_id.toString())
      const dto = this.createLikeMapper.toMapper(res)
      return new OK([dto], code.SUCCESSFULLY_CREATED, message.SUCCESSFULLY_CREATED) 
    }
  }

}

