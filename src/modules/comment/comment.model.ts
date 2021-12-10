import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { UpdateDto } from './dto/update.dto'
import { 
  InternalServerErrorExceptions,
  NotFoundExceptions,
} from '@service/exception'
import { CommentRepository } from './comment.repository'


@Injectable()
export class CommentModel {

  constructor(@InjectRepository(CommentRepository) private readonly repository: CommentRepository) {}

  public async create(comment:any){
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

  public async findOneByUserIdAndPublicationId(publicationId:string, userId:string){
      try{
          const res = await this.repository.findOne({ where:{ publication_id: publicationId, user_id:userId }})
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

  public async findOneById(id:string){
    try{
        const res = await this.repository.findOne(id)
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

  public async findByUserId(userId:string){
    try{
        //const res = await this.repository.find({ where:{ user_id: userId }})
        const res = await this.repository.find({
          select: ["comment", "id"],
         
          where: {
            user_id: userId
          },
          order: {
            id: "ASC",//DESC ASC
          },
          skip: 3,
          take: 3,
          cache: true,
        });
        if(Object.keys(res).length != 0){
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

  public async findByPublicationId(publicationId:string){
    try{
        const res = await this.repository.find({ where:{ publication_id: publicationId }})
        if(Object.keys(res).length != 0){
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

  public async deleteById(id:string){
    try{
        const res = await this.repository.delete(id);
        if(res){
            return res
        }
        throw res
    }catch(error){
        throw new InternalServerErrorExceptions({
            code:code.ERROR_GENERIC,
            message:message.ERROR_GENERIC,
            description:"algo aconteceu em verifica se esta seguindo"+` ::: ${error}`
        })
    }
  }

  public async updateById(id:string, body: UpdateDto) {
      try{
          const res = await this.repository.update(id, { ...body as any });
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

