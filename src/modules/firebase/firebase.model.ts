import { Injectable, Inject, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import * as firebase from 'firebase-admin';
import { code, message } from '@root/src/lib/enum'

import { 
  InternalServerErrorExceptions,
  NotFoundExceptions
} from '@root/src/lib/exception/exception'

@Injectable({ scope: Scope.REQUEST })
@Injectable()
export class FirebaseModel {

  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public async isToken(token:string) {
    try{
      if(token == "" || token == null){
        throw 'TOKEN_IS_NULL'
      }

      if(token.startsWith('Bearer ') == !true){
        throw 'NOT_BEARER'
      }

      if(token.length <= 84){
        throw 'SMALL_TOKEN'
      }

      if(token.indexOf('.') == -1){
        throw 'TOKEN_MISSING_SPECIAL_CHARACTER'
      }

      return token.replace('Bearer ', '');
    }catch(error) {
      if(error == 'TOKEN_IS_NULL'){
        throw new NotFoundExceptions({
          code:code.TOKEN_IS_NULL,
          message:message.TOKEN_IS_NULL
        })
      }
      if(error == 'NOT_BEARER'){
        throw new NotFoundExceptions({
          code:code.NOT_BEARER,
          message:message.NOT_BEARER
        })
      }
      if(error == 'SMALL_TOKEN'){
        throw new NotFoundExceptions({
          code:code.SMALL_TOKEN,
          message:message.SMALL_TOKEN
        })
      }
      if(error == 'TOKEN_MISSING_SPECIAL_CHARACTER'){
        throw new NotFoundExceptions({
          code:code.TOKEN_MISSING_SPECIAL_CHARACTER,
          message:message.TOKEN_MISSING_SPECIAL_CHARACTER,
          method:this.request.url,
          path:this.request.method
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method
      })
    }
  }

  public async validateTokenByFirebase(token:string) {
    try{
     let decodedToken = await firebase.auth().verifyIdToken(token, true)

     if(decodedToken.uid){
      return decodedToken
     }

     throw decodedToken

    }catch(error:any) {
      if(error.code){
        throw new NotFoundExceptions({
          code:error.code,
          message:error.message,
          method:this.request.url,
          path:this.request.method
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method
      })
    }
  }

  public async revokeRefreshTokens(uid:string) {
    try{
      let revoke = await firebase.auth().revokeRefreshTokens(uid).then(()=>true)
      if(revoke){
        return revoke
      }
      throw revoke
    }catch(error:any) {
      if(error.code){
        throw new NotFoundExceptions({
          code:error.code,
          message:error.message,
          method:this.request.url,
          path:this.request.method
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method
      })
    }
  }

  public async getUserByUid(uid:string) {
    try{
      let user = await firebase.auth().getUser(uid)
      if(user){
      return user.toJSON()
     }
     throw user
    }catch(error:any) {
      if(error.code){
        throw new NotFoundExceptions({
          code:error.code,
          message:error.message,
          method:this.request.url,
          path:this.request.method
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method
      })
    }
  }

  public async getUserByEmail(email:string) {
    try{
      let user = await firebase.auth().getUserByEmail(email)
      if(user){
      return user.toJSON()
     }
     throw user
    }catch(error:any) {
      if(error.code){
        throw new NotFoundExceptions({
          code:error.code,
          message:error.message,
          method:this.request.url,
          path:this.request.method
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method
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
          code:code.NOT_FOUND_USER,
          message:message.NOT_FOUND_USER,
          method:this.request.url,
          path:this.request.method
        })
      }
      throw new InternalServerErrorExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC,
        method:this.request.url,
        path:this.request.method
      })
    }
  }

}

