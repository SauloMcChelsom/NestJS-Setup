import { Injectable } from '@nestjs/common'
import { OK, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { FirebaseModel } from './firebase.model'
import { CheckUserExistsMapper } from './mapper/check-user-exists-by-email.mapper'

@Injectable()
export class FirebaseService {

  constructor(private validate:FirebaseModel, private checkUserExistsMapper:CheckUserExistsMapper) {}

  public async verifyToken(token:string) {
    let body = await this.validate.isToken(token)
    await this.validate.validateTokenByFirebase(body)
    return await new OK(
      [],
      code.VALID_TOKEN,
      message.VALID_TOKEN
    )
  }

  public async revokeRefreshTokens(token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)
    await this.validate.revokeRefreshTokens(decoded.uid)
    return await new OK(
      [],
      code.TOKEN_REVOKE_WITH_SUCCESS,
      message.TOKEN_REVOKE_WITH_SUCCESS
    )
  }

  public async getUserByEmail(email:string, token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)
    if(decoded.email != email){
      return await new ConflictExceptions({
        code:code.EMAIL_INVALID,
        message:message.EMAIL_INVALID,
        description:message.EMAIL_INVALID_CONFLICT_TOKEN_DESCRIPTION
      })
    }
    let user =  await this.validate.getUserByEmail(email)
    return await new OK(
      [user],
      code.USER_FOUND,
      message.USER_FOUND
    )
  } 

  public async getUserByUid(uid:string, token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)

    if(decoded.uid != uid){
      return await new ConflictExceptions({
        code:code.UID_INVALID,
        message:message.UID_INVALID,
        description:message.UID_INVALID_CONFLICT_TOKEN_DESCRIPTION
      })
    }
    let user =  await this.validate.getUserByUid(uid)
    return await new OK(
      [user],
      code.USER_FOUND,
      message.USER_FOUND
    )
  }

  public async userDisplayByEmail(email:string) {
    let user = await this.validate.getUserByEmail(email)
    const dto = this.checkUserExistsMapper.toDto(user)
    return await new OK(
      [dto],
      code.USER_FOUND,
      message.USER_FOUND
    )
  } 

  public async deleteUser(token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)
    await this.validate.deleteUser(decoded.uid)
    return await new OK(
      [],
      code.SUCCESSFULLY_DELETED_USER,
      message.SUCCESSFULLY_DELETED_USER
    )
  }

  public async isToken(token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)
    await this.validate.deleteUser(decoded.uid)
    return await new OK(
      [],
      code.SUCCESSFULLY_DELETED_USER,
      message.SUCCESSFULLY_DELETED_USER
    )
  }

  public async validateTokenByFirebase(token:string) {
    let body = await this.validate.isToken(token)
    return await this.validate.validateTokenByFirebase(body)
  }
}

