import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { code, message } from '../../shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions
} from '../../service/exception'

@Injectable()
export class UserValidator {

  constructor(@InjectRepository(UserRepository) private readonly repository: UserRepository) {}

  public async emailAlreadyExist(email:string) {
    try{
      const res = await this.repository.findOne({ where:{ email: email }})
      if(res){
        throw true
      }
    }catch(error){
      if(error == true){
        throw new ConflictExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"
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
        message:message.ERROR_GENERIC
      })
    }
  }

  public async providersIsValid(providers:string) {
    try{
      if(providers == "google" || providers == "email_password"){
        return
      }
      throw true
    }catch(error){
      if(error == true){
        throw new BadRequestExceptions({
          code:code.PROVIDERS_USER_IS_INVALID,
          message:message.PROVIDERS_USER_IS_INVALID,
          description:"usuario autenticou com o google ou email/senha? example: google ou email_password"
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em validar o provedor"
      })
    }
  }
}