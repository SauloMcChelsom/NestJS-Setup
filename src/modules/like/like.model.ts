import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
} from '@service/exception'
import { LikeRepository } from './like.repository'


@Injectable()
export class LikeModel {

  constructor(@InjectRepository(LikeRepository) private readonly repository: LikeRepository) {}

    public async userAlreadyLikePublication(publication_id:string, userId:string){
        try{
            const res = await this.repository.findOne({ where:{ publication_id: publication_id, user_id:userId }})
            if(res){
                return true
            }else{
                return false
            }
            }catch(error){
            throw new InternalServerErrorExceptions({
                code:code.ERROR_GENERIC,
                message:message.ERROR_GENERIC,
                description:"algo aconteceu em verificar se o usuario ja seguiu a pagina"+` ::: ${error}`
            })
        }
    }

    public async getLike(publication_id:string, userId:string){
        try{
            const res = await this.repository.findOne({ where:{ publication_id: publication_id, user_id:userId }})
            if(res){
                return res
            }
            throw true
        }catch(error){
            if(error == true){
                throw new NotFoundExceptions({
                  code:code.NOT_FOUND,
                  message:message.NOT_FOUND,
                })
            }
            throw new InternalServerErrorExceptions({
                code:code.ERROR_GENERIC,
                message:message.ERROR_GENERIC,
                description:"algo aconteceu em verifica se esta seguindo"+` ::: ${error}`
            })
        }
    }

    public async updateLike(id:string, body:any) {
        try{
            const res = await this.repository.update(id, body);
          if(res){
            return res
          }
        }catch(error){
          throw new InternalServerErrorExceptions({
            code:code.ERROR_GENERIC,
            message:message.ERROR_GENERIC,
            description:"algo aconteceu em atualizar updateAmFollowing"+` ::: ${error}`
          })
        }
    }
}

