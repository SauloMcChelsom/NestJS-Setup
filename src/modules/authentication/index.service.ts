import { Injectable } from '@nestjs/common'
import { OK } from '@service/exception'
import { code, message } from '@shared/enum'
import { UserValidate } from './user.validate'

@Injectable()
export class IndexService {

  constructor(private validate:UserValidate) {}

  public async verifyIdToken(token:string) {
    let decodedToken = await this.validate.verifyIdToken(token)
    return await new OK(
      [decodedToken],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  }

  public async revokeRefreshTokens(token:string) {
    let decodedToken = await this.validate.verifyIdToken(token)
    await this.validate.revokeRefreshTokens(decodedToken.uid)
    return await new OK(
      [],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  }

  public async getUser(uid:string) {
    let user =  await this.validate.getUserByUid(uid)
    return await new OK(
      [user],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )

  }

  public async getUserByEmail(email:string) {
    let user =  await this.validate.getUserByEmail(email)
    return await new OK(
      [user],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  } 
  
  public async createUser(user:any){
    let newUser =  await this.validate.createUser(user)
    return await new OK(
      [newUser],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  }

  public async updateUser(uid:string, user:any) {
    let newUser =  await this.validate.updateUser(uid, user)
    return await new OK(
      [newUser],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  }

  public async deleteUser(uid:string) {
    await this.validate.deleteUser(uid)
    return await new OK(
      [],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  }

}

