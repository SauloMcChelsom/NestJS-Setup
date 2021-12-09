
import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
} from '@service/exception'

import { PublicationRepository } from './publication.repository'


@Injectable()
export class PublicationModel {

  constructor(@InjectRepository(PublicationRepository) private readonly repository: PublicationRepository) {}

    
    public async incrementNumberLikeOfPublication(id:any) {
        try{
            let publication = await this.repository.findOne({ where:{ id: id }})
            if(typeof publication?.number_of_likes == "number"){
                publication.number_of_likes++ 
                await this.repository.update(publication.id, { number_of_likes: publication.number_of_likes });
            }
        }catch(error){
            throw new InternalServerErrorExceptions({
                code:code.ERROR_GENERIC,
                message:message.ERROR_GENERIC,
                description:"algo aconteceu em incrementar o numero da pagina"+` ::: ${error}`
            })
        }
    }

    public async decrementNumberLikeOfPublication(id:any) { 
        try{
            let publication = await this.repository.findOne({ where:{ id: id }})
            if(typeof publication?.number_of_likes == "number"){
                publication.number_of_likes--
                await this.repository.update(publication.id, { number_of_likes: publication.number_of_likes });
            }
        }catch(error){
            throw new InternalServerErrorExceptions({
                code:code.ERROR_GENERIC,
                message:message.ERROR_GENERIC,
                description:"algo aconteceu em incrementar o numero da pagina"+` ::: ${error}`
            })
        }
    }
  }
