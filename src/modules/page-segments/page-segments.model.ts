import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
} from '@service/exception'
import { PageSegmentsRepository } from './page-segments.repository'


@Injectable()
export class PageSegmentsModel {

  constructor(@InjectRepository(PageSegmentsRepository) private readonly repository: PageSegmentsRepository) {}

  public async pageFollowAlreadyExist(userId:string, pageId:string) {
    try{
      const res = await this.repository.findOne({ where:{ user_id: userId, page_id:pageId }})
      if(res){
        throw true
      }
    }catch(error){
      if(error == true){
        throw new ConflictExceptions({
          code:code.ALREADY_IN_USE,
          message:message.ALREADY_IN_USE,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async userFollowPage(userId:string, pageId:string) {
    try{
      const res = await this.repository.findOne({ where:{ user_id: userId, page_id:pageId }})
      if(res){
        return true
      }else{
        return false
      }
    }catch(error){
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async getPageUserFollow(userId:string, pageId:string) {
    try{
      const res = await this.repository.findOne({ where:{ user_id: userId, page_id:pageId }})
      if(res){
        return res
      }
      throw true
    }catch(error){
      if(error == true){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND_USER,
          message:message.NOT_FOUND_USER,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async findByIdPage(id:string) {
    try{
        const res = await this.repository.find({ where:{ page_id: id }})
      if(res){
        return res
      }
      throw true
    }catch(error){
      if(error == true){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND_USER,
          message:message.NOT_FOUND_USER,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em buscar usuario por uid"+` ::: ${error}`
      })
    }
  }

  public async findByIdUser(id:string) {
    try{
        const res = await this.repository.find({ where:{ user_id: id }})
      if(res){
        return res
      }
      throw true
    }catch(error){
      if(error == true){
        throw new NotFoundExceptions({
          code:code.NOT_FOUND_USER,
          message:message.NOT_FOUND_USER,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em buscar usuario por uid"+` ::: ${error}`
      })
    }
  }

  public async updateAmFollowing(id:string, body:any) {
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

