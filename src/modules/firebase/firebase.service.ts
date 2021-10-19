import { Injectable } from '@nestjs/common'
import { OK, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'
import { FirebaseValidate } from './firebase.validate'
import { CheckUserExistsMapper } from './mapper/check-user-exists-by-email.mapper'

@Injectable()
export class FirebaseService {

  constructor(private validate:FirebaseValidate, private checkUserExistsMapper:CheckUserExistsMapper) {}

  public async verifyToken(token:string) {
    let body = await this.validate.isToken(token)
    let decodedToken = await this.validate.validateTokenByFirebase(body)
    return await new OK(
      [decodedToken],
      code.VALID_TOKEN,
      message.VALID_TOKEN
    )
  }

  public async revokeRefreshTokens(token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)
    await this.validate.revokeRefreshTokens(decoded.uid)
    return await new OK()
  }

  public async getUserByEmail(email:string, token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)
    if(decoded.email == email){
      return await new ConflictExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
    let user =  await this.validate.getUserByEmail(email)
    return await new OK(
      [user],
      code.EMAIL_VERIFIED,
      message.EMAIL_VERIFIED
    )
  } 

  public async getUserByUid(uid:string, token:string) {
    let body = await this.validate.isToken(token)
    let decoded = await this.validate.validateTokenByFirebase(body)
    if(decoded.uid == uid){
      return await new ConflictExceptions({
        code:code.ERROR_GENERIC,
        message:message.ERROR_GENERIC
      })
    }
    let user =  await this.validate.getUserByUid(uid)
    return await new OK(
      [user],
      code.UID_VALID,
      message.UID_VALID
    )
  } 

  public async checkUserExistsByUid(uid:string) {
    let user = await this.validate.getUserByUid(uid)
    return await new OK(
      [user],
      code.UID_ALREADY_IN_USE,
      message.UID_ALREADY_IN_USE
    )
  }

  public async checkUserExistsByEmail(email:string) {
    let user = await this.validate.getUserByEmail(email)
    const dto = this.checkUserExistsMapper.toDto(user)
    return await new OK(
      [dto],
      code.EMAIL_ALREADY_IN_USE,
      message.EMAIL_ALREADY_IN_USE
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

}
