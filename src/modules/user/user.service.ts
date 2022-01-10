import { Injectable } from '@nestjs/common'

import { FirebaseModel } from '@modules/firebase/firebase.model'
import { CryptUtilityService } from '@shared/bcrypt/bcrypt.service'
import { OK } from '@service/exception'
import { code, message } from '@shared/enum'

import { UserModel } from './user.model'
import { CreateInterface, UpdateInterface } from './interface'
import { 
  CreateMapper,
  AuthFindOneMapper,
  PublicFindOneMapper
} from './mapper'

@Injectable()
export class UserService {

  constructor(
    private model:UserModel,
    private validateFirebase:FirebaseModel,
    private crypt:CryptUtilityService,
    private createMapper:CreateMapper,
    private authFindOneMapper:AuthFindOneMapper,
    private publicFindOneMapper:PublicFindOneMapper,
  ) {}

  public async create(body:CreateInterface) {
    await this.model.emailAlreadyExist(body.email)
    await this.model.uidAlreadyExist(body.uid)
    await this.model.providersIsValid(body.providers)
    body.password = await this.crypt.hash(body.password);
    const res = await this.model.create(body)
    const dto = this.createMapper.toMapper(res)
    return new OK([dto], code.USER_REGISTERED, message.USER_REGISTERED)
  }

  public async authFindOneByUid(uid:string) {
    const res = await this.model.getUserByUid(uid)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto])
  }

  public async publicFindOneByUid(uid:string) {
    const res = await this.model.getUserByUid(uid)
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto])
  }

  public async authFindOneByEmail(email:string) {
    const res = await this.model.getUserByEmail(email)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto])
  }

  public async publicFindOneByEmail(email:string) {
    const res = await this.model.getUserByEmail(email)
    const dto = this.publicFindOneMapper.toMapper(res)
    return new OK([dto])
  }

  public async updateByUid(uid:string, body:UpdateInterface) {
    const { id } = await this.model.getUserByUid(uid)
    await this.model.updateUserByUid(id, body)
    const res = await this.model.getUserByUid(uid)
    const dto = this.authFindOneMapper.toMapper(res)
    return new OK([dto], code.USER_UPDATED, message.USER_UPDATED) 
  }

  public async deleteByUid(uid:string) {
    const { id } = await this.model.getUserByUid(uid)
    await this.validateFirebase.revokeRefreshTokens(uid)
    await this.validateFirebase.deleteUser(uid)
    await this.model.delete(id);
    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }

  public async getUserByUid(uid:string) {
    return await this.model.getUserByUid(uid)
  }

  
}

