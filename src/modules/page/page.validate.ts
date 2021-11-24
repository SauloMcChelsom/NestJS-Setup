import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { code, message } from '@shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
} from '@service/exception'
import { PageRepository } from './page.repository'


@Injectable()
export class PageValidate {

  constructor(@InjectRepository(PageRepository) private readonly repository: PageRepository) {}

  public async pageAlreadyExist(page:string) {
    try{
      const res = await this.repository.findOne({ where:{ page_name: page }})
      if(res){
        throw true
      }
    }catch(error){
      if(error == true){
        throw new ConflictExceptions({
          code:code.PAGE_ALREADY_IN_USE,
          message:message.PAGE_ALREADY_IN_USE,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async uidAlreadyExist(uid:string) {
    try{
      const res = await this.repository.findOne({ where:{ uid: uid }})
      if(res){
        throw true
      }
    }catch(error){
      if(error == true){
        throw new ConflictExceptions({
          code:code.UID_ALREADY_IN_USE,
          message:message.UID_ALREADY_IN_USE,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description: "algo aconteceu em verificar se o uid ja existe"+` ::: ${error}`
      })
    }
  }

  public async providersIsValid(providers:string) {
    try{
      if(providers == "google.com" || providers == "email_password"){
        return
      }
      throw true
    }catch(error){
      if(error == true){
        throw new BadRequestExceptions({
          code:code.PROVIDERS_USER_IS_INVALID,
          message:message.PROVIDERS_USER_IS_INVALID,
          description:"usuario autenticou com o google.com ou email/senha? example: google ou email_password"
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em validar o provedor"+` ::: ${error}`
      })
    }
  }

  public async getUserByUid(uid:string) {
    try{
      const res = await this.repository.findOne({ where:{ uid: uid }})
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

  public async getUserByEmail(email:string) {
    try{
      const res = await this.repository.findOne({ where:{ email: email }})
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
        description:"algo aconteceu em buscar usuario por email"+` ::: ${error}`
      })
    }
  }

  public async deleteUserByUid(id:number) {
    try{
      const res = await this.repository.delete(id)
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
        description:"algo aconteceu em deletar usuario por uid"+` ::: ${error}`
      })
    }
  }
}

