import { Injectable } from '@nestjs/common'
import * as firebase from 'firebase-admin';
import { serviceAccounts } from './firebase.config';
import { code, message } from '@shared/enum'
import { 
  ConflictExceptions, 
  InternalServerErrorExceptions,
  BadRequestExceptions,
  NotFoundExceptions
} from '@service/exception'
import { CreateDto } from './dto/create.dto'
import { UpdateDto  } from './dto/update.dto'

@Injectable()
export class UserValidate {

  constructor() {
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccounts),
    });
  }

  public async verifyIdToken(token:string) {
    try{
     let decodedToken = await firebase.auth().verifyIdToken(token, true)
     if(decodedToken){
      return decodedToken
     }
     throw true
    }catch(error) {
      if(error == true){
        throw new NotFoundExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
          description: 'Error verify id  token'+ error
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async revokeRefreshTokens(uid:string) {
    try{
     let revoke= await firebase.auth().revokeRefreshTokens(uid).then(()=>true)
     if(revoke){
      return revoke
     }
     throw true
    }catch(error) {
      if(error == true){
        throw new NotFoundExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
          description: 'Error verify id  token'+ error
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async getUserByUid(uid:string) {
    try{
      let user = await firebase.auth().getUser(uid)
      if(user){
      return user.toJSON()
     }
     throw true
    }catch(error) {
      if(error == true){
        throw new NotFoundExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
          description: 'Error verify id  token'+ error
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async getUserByEmail(email:string) {
    try{
      let user = await firebase.auth().getUserByEmail(email)
      if(user){
      return user.toJSON()
     }
     throw true
    }catch(error) {
      if(error == true){
        throw new NotFoundExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
          description: 'Error verify id  token'+ error
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async createUser(user:CreateDto) {
    try{
      let newUser = await firebase.auth().createUser(user)
      if(newUser){
      return newUser
     }
     throw true
    }catch(error) {
      if(error == true){
        throw new NotFoundExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
          description: 'Error verify id  token'+ error
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async updateUser(uid:string, user:UpdateDto) {
    try{
      let newUser = await firebase.auth().updateUser(uid, user)
      if(newUser){
      return newUser.toJSON()
     }
     throw true
    }catch(error) {
      if(error == true){
        throw new NotFoundExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
          description: 'Error verify id  token'+ error
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

  public async deleteUser(uid:string) {
    try{
     let deleted = await firebase.auth().deleteUser(uid).then(()=>true)
     if(deleted){
      return deleted
     }
     throw true
    }catch(error) {
      if(error == true){
        throw new NotFoundExceptions({
          code:code.EMAIL_ALREADY_IN_USE,
          message:message.EMAIL_ALREADY_IN_USE,
          description: 'Error verify id  token'+ error
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        description:"algo aconteceu em encontrar o email do usuario"+` ::: ${error}`
      })
    }
  }

}

