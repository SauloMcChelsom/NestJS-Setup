import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'
import { UserRepository } from './user.repository'
import { hash, compare } from 'bcryptjs';

import { RetornPerfilUser } from './map/retorn-perfil-user.map'
import { checkIfUserExistsByEmailMap  } from './map/check-If-user-exists-by-email.map'

import { Client, code  } from '../../exception/index.exception'

@Injectable()
export class UserValidator {

  constructor(@InjectRepository(UserRepository) private readonly repository: UserRepository) {}

  public async emailAlreadyExist(email) {
    try{
      const res = await this.repository.findOne({ where:{ email: email }})
      if(res){
        throw new Client().ConflictException({
          code:code.EMAIL_ALREADY_IN_USE,
          message:"Email ja existe",
        })
      }
    }catch(error){
      if(error){
        throw error
      }
      throw new Client().InternalServerErrorException({
        code:"error_generic",
        message:"Error em encontar o email",
        description: error
      })
    }
  }


}