import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
} from '@service/exception'
import { CommentRepository } from './comment.repository'


@Injectable()
export class CommentModel {

  constructor(@InjectRepository(CommentRepository) private readonly repository: CommentRepository) {}

  public async saveComment(comment:any){
    try{
        const res = await this.repository.save(comment)
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

  public async getComment(publication_id:string, userId:string){
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

  public async findOneById(userId:string){
    try{
        const res = await this.repository.findOne(userId)
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

  public async updateComment(id:string, body:any) {
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

