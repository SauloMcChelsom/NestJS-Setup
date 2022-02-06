import { HttpException } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { code, message } from '@root/src/lib/enum'
import { LikeRepository } from './like.repository'
import { CreateInterface } from './interface/create.interface'

export class LikeModel {

  constructor(@InjectRepository(LikeRepository) private readonly repository: LikeRepository) {}

  public async save(body:CreateInterface){
    try{
      await this.repository.save(body)
    }catch(error){
      throw new HttpException(
        [
          code.ERROR_GENERIC,
          message.ERROR_GENERIC
        ],
        500
      )
    }
  }

  public async userAlreadyLikePublication(publicationId:string, userId:string){
    try{
      const res = await this.repository.findOne({ where:{ publication_id: publicationId, user_id:userId }})

      if(res){
        return true
      }else{
        return false
      }

    }catch(error){
      throw new HttpException(
        [
          code.ERROR_GENERIC,
          message.ERROR_GENERIC
        ],
        500
      )
    }
  }

  public async validatePublicationExists(publicationId:number){
    try{
      const res = await this.repository.findOne({ where:{ publication_id: publicationId }})

      if(res){
        return true
      }

      throw new HttpException(code.NOT_FOUND,404)

    }catch(error){
      throw new HttpException(
        [
          code.ERROR_GENERIC,
          message.ERROR_GENERIC
        ],
        500
      )
    }
  }

  public async getLike(publication_id:string, userId:string){
    try{
      const res = await this.repository.findOne({ where:{ publication_id: publication_id, user_id:userId }})
      if(res){
        return res
      }
      throw new HttpException(code.NOT_FOUND,404)
      
    }catch(e:any){
      throw new HttpException(e.response, e.status);
    }
  }

  public async updateLike(id:string, body:any){
    try{
      const res = await this.repository.update(id, body);
      if(res){
        return res
      }
    }catch(error){
      throw new HttpException(
        [
          code.ERROR_GENERIC,
          message.ERROR_GENERIC
        ],
        500
      )
    }
  }
}

