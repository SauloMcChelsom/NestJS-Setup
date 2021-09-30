import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { code, message } from '../../shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
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
        message:message.ERROR_GENERIC,
        description: "algo aconteceu em verificar se o uid ja existe"
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
        description:"algo aconteceu em buscar usuario por uid"
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
        description:"algo aconteceu em buscar usuario por email"
      })
    }
  }

  public async updateUserByUid(id:number, user:any) {
    try{
      const res = await this.repository.update(id, user)
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
        description:"algo aconteceu em atualizar usuario por uid"
      })
    }
  }
}

