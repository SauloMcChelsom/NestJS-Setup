import { Injectable } from '@nestjs/common'
import { ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { FirebaseModel } from './firebase.model'

@Injectable()
export class FirebaseService {

  constructor(private model:FirebaseModel) {}

  public async verifyToken(token:string) {
    let body = await this.model.isToken(token)
    return await this.model.validateTokenByFirebase(body)
  }

  public async revokeRefreshTokens(token:string) {
    let body = await this.model.isToken(token)
    let decoded = await this.model.validateTokenByFirebase(body)
    return this.model.revokeRefreshTokens(decoded.uid)
  }

  public async getUserByEmail(email:string, token:string) {
    let body = await this.model.isToken(token)
    let decoded = await this.model.validateTokenByFirebase(body)
    if(decoded.email != email){
      return await new ConflictExceptions({
        code:code.EMAIL_INVALID,
        message:message.EMAIL_INVALID,
        description:message.EMAIL_INVALID_CONFLICT_TOKEN_DESCRIPTION
      })
    }
    return  await this.model.getUserByEmail(email)
  } 

  public async getUserByUid(uid:string, token:string) {
    let body = await this.model.isToken(token)
    let decoded = await this.model.validateTokenByFirebase(body)

    if(decoded.uid != uid){
      return await new ConflictExceptions({
        code:code.UID_INVALID,
        message:message.UID_INVALID,
        description:message.UID_INVALID_CONFLICT_TOKEN_DESCRIPTION
      })
    }
    return  await this.model.getUserByUid(uid)
  }

  public async userDisplayByEmail(email:string) {
    return await this.model.getUserByEmail(email)
  } 

  public async deleteUser(token:string) {
    let body = await this.model.isToken(token)
    let decoded = await this.model.validateTokenByFirebase(body)
    await this.model.deleteUser(decoded.uid)
    return true
  }

  public async validateTokenByFirebase(token:string) {
    let body = await this.model.isToken(token)
    return await this.model.validateTokenByFirebase(body)
  }
}

