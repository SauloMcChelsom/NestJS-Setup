import { Injectable } from '@nestjs/common'
import { InjectRepository} from '@nestjs/typeorm'

import { CryptUtilityService } from '@shared/bcrypt/bcrypt.service'
import { OK, NotFoundExceptions, ConflictExceptions } from '@service/exception'
import { code, message } from '@shared/enum'

import { FirebaseModel } from '@root/src/modules/firebase/firebase.model'

import { UserModel } from './user.model'
import { UserRepository } from './user.repository'
import { PerfilUserMapper, CheckUserExistsByEmailMapper } from './mapper'
import { CreateNewUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository) 
    private readonly repository: UserRepository, 
    private validate:UserModel,
    private validateFirebase:FirebaseModel,
    private crypt:CryptUtilityService,
    private perfilUserMapper:PerfilUserMapper,
    private checkUserExistsByEmailMapper:CheckUserExistsByEmailMapper
  ) {}

  public async save(user:CreateNewUserDto) {
    await this.validate.emailAlreadyExist(user.email)
    await this.validate.uidAlreadyExist(user.uid)
    await this.validate.providersIsValid(user.providers)
    user.password = await this.crypt.hash(user.password);
    const res = await this.repository.save(user)
    const dto = this.perfilUserMapper.toDto(res)
    return new OK(
      [dto],
      code.USER_REGISTERED,
      message.USER_REGISTERED
    )
  }

  public async findAll(token:string) {
    let body = await this.validateFirebase.isToken(token)
    let decoded = await this.validateFirebase.validateTokenByFirebase(body)

    const res = await this.repository.find();
    
    if(Object.keys(res).length == 0){
      throw new NotFoundExceptions({
        code:code.NOT_FOUND_USER,
        message:message.NOT_FOUND_USER,
      })
    }
    const dto = res.map((r)=> this.perfilUserMapper.toDto(r))
    return new OK(dto)
  }

  public async getUserByUid(uid:string, token:string) {
    let body = await this.validateFirebase.isToken(token)
    let decoded = await this.validateFirebase.validateTokenByFirebase(body)

    if(decoded.uid != uid){
      return await new ConflictExceptions({
        code:code.UID_INVALID,
        message:message.UID_INVALID,
        description:message.UID_INVALID_CONFLICT_TOKEN_DESCRIPTION
      })
    }

    const res = await this.validate.getUserByUid(uid)
    const dto = this.perfilUserMapper.toDto(res)
    return new OK([dto])
  }

  public async getUserByEmail(email:string, token:string) {
    let body = await this.validateFirebase.isToken(token)
    let decoded = await this.validateFirebase.validateTokenByFirebase(body)

    if(decoded.email != email){
      return await new ConflictExceptions({
        code:code.EMAIL_INVALID,
        message:message.EMAIL_INVALID,
        description:message.EMAIL_INVALID_CONFLICT_TOKEN_DESCRIPTION
      })
    }

    const res = await this.validate.getUserByEmail(email)
    const dto = this.perfilUserMapper.toDto(res)
    return new OK([dto])
  }

  public async checkUserExistsByEmail(email:string) {
    const res = await this.validate.getUserByEmail(email)
    const dto = this.checkUserExistsByEmailMapper.toDto(res)
    return new OK([dto])
  }

  public async updateUserByUid(uid:string, user:UpdateUserDto, token:string) {
    let body = await this.validateFirebase.isToken(token)
    let decoded = await this.validateFirebase.validateTokenByFirebase(body)

    if(decoded.uid != uid){
      return await new ConflictExceptions({
        code:code.UID_INVALID,
        message:message.UID_INVALID,
        description:message.UID_INVALID_CONFLICT_TOKEN_DESCRIPTION
      })
    }

    const { id } = await this.validate.getUserByUid(uid)
    await this.validate.updateUserByUid(id, user)
    const res = await this.validate.getUserByUid(uid)
    const dto = this.perfilUserMapper.toDto(res)
    return new OK([dto], code.USER_UPDATED, message.USER_UPDATED) 
  }

  public async deleteUserByUid(token:string) {
    let body = await this.validateFirebase.isToken(token)
    let decoded = await this.validateFirebase.validateTokenByFirebase(body)

    const { id, uid } = await this.validate.getUserByUid(decoded.uid)

    await this.validateFirebase.revokeRefreshTokens(uid)

    await this.validateFirebase.deleteUser(uid)

    await this.repository.deleteUserByUid(id);

    return new OK([], code.DELETED_SUCCESSFULLY, message.DELETED_SUCCESSFULLY) 
  }
}

