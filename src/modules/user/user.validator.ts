import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { hash, compare } from 'bcryptjs';

import { PerfilUserReturn } from './return/perfil-user.return'
import { checkIfUserExistsByEmailReturn  } from './return/check-If-user-exists-by-email.return'

import { Exception } from '../../exception/'

@Injectable()
export class UserValidator {

  constructor(@InjectRepository(UserRepository) private readonly repository: UserRepository) {}

  public async emailAlreadyExist(email) {
    try{
      const res = await this.repository.findOne({ where:{ email: email }})
      if(res){
        throw new Exception().ConflictException({
          code:'EMAIL_ALREADY_IN_USE',
          message:"Email ja existe",
        })
      }
    }catch(error){
      if(error){
        throw error
      }
      throw new Exception().InternalServerErrorException({
        code:"error_generic",
        message:"Error em encontar o email",
        description: error
      })
    }
  }


}