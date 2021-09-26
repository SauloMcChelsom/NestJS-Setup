import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { code, message } from '../../shared/enum'
import { ConflictExceptions, InternalServerErrorExceptions } from '../../service/exception'

@Injectable()
export class UserValidator {

  constructor(@InjectRepository(UserRepository) private readonly repository: UserRepository) {}

  public async emailAlreadyExist(email:any) {
    try{
      const res = await this.repository.findOne({ where:{ email: email }})
      if(res){
        throw new ConflictExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
        })
      }
    }catch(error){
      if(error){
        throw error
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
  }

  public async uidAlreadyExist(uid:any) {
    try{
      const res = await this.repository.findOne({ where:{ uid: uid }})
      if(res){
        throw new ConflictExceptions({
          code:code.UID_ALREADY_IN_USE,
          message:message.UID_ALREADY_IN_USE,
        })
      }
    }catch(error){
      if(error){
        throw error
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
  }
}